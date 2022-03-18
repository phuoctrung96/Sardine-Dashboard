import express, { Response } from "express";
import axios from "axios";
import config from "config";
import { query } from "express-validator";
import {
  FeedbackRequest,
  FeedbacksRequestBody,
  FEEDBACK_SCOPES,
  GetFeedbacksListResponse,
  GetFeedbacksResponse,
} from "sardine-dashboard-typescript-definitions";
import { mw } from "../../commons/middleware";
import { RequestWithCurrentUser, RequestWithUser } from "../request-interface";
import { captureException } from "../../utils/error-utils";
import { getFeedbackList, getFeedbacks } from "../../commons/models/datastore/feedback";

const router = express.Router();

const feedbacksRouter = () => {
  router.get(
    "",
    [query("sessionKey").exists()],
    [mw.validateRequest, mw.requireLoggedIn],
    async (req: RequestWithUser, res: Response) => {
      const { sessionKey = "" } = req.query;
      try {
        const feedbacks = await getFeedbackList(sessionKey as string);
        return res.json({
          result: feedbacks.reduce<GetFeedbacksResponse>((acc, feedback) => {
            acc.push({
              scope: FEEDBACK_SCOPES[feedback.Feedback.Scope],
              status: feedback.Feedback.Status,
              reason: feedback.Feedback.Reason,
              type: feedback.Feedback.Type,
              time: feedback.Feedback.Time,
            });
            return acc;
          }, []),
        });
      } catch (err: unknown) {
        captureException(err);

        if (err instanceof Error) {
          return res.status(500).json({ error: err.message });
        }

        return res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  router.get(
    "/list",
    [],
    [mw.validateRequest, mw.requireLoggedIn],
    async (req: RequestWithCurrentUser<FeedbacksRequestBody>, res: Response) => {
      try {
        const { feedbacks, isLast } = await getFeedbacks(req.query);
        return res.json({
          feedbacks: feedbacks.reduce<GetFeedbacksListResponse>((acc, feedback) => {
            acc.push({
              scope: FEEDBACK_SCOPES[feedback.Feedback.Scope],
              status: feedback.Feedback.Status,
              reason: feedback.Feedback.Reason,
              type: feedback.Feedback.Type,
              time: feedback.Feedback.Time,
              sessionKey: feedback.SessionKey,
              userId: feedback.CustomerFeedback?.Id,
              dateTime: feedback.CustomerFeedback?.CreatedAtMillis,
            });
            return acc;
          }, []),
          isLast,
        });
      } catch (err: unknown) {
        captureException(err);

        if (err instanceof Error) {
          return res.status(500).json({ error: err.message, err });
        }

        return res.status(500).json({ error: "Internal server error", err });
      }
    }
  );

  router.post(
    "",
    [],
    mw.validateRequest,
    mw.requireLoggedIn,
    mw.assignOrganisationClientId,
    async (req: RequestWithUser<FeedbackRequest>, res: Response) => {
      if (!process.env.SARDINE_API_INTERNAL_KEY) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!req.currentUser?.organisation_client_id) {
        return res.status(400).json({ error: "Organisation client id is missing" });
      }

      try {
        await axios.post(
          `${config.get("SARDINE_API_ENDPOINT")}/v1/feedbacks`,
          {
            sessionKey: req.body.sessionKey,
            customer: {
              id: req.body.customer.id,
            },
            transaction: {
              id: req.body.transaction.id,
            },
            feedback: {
              scope: req.body.feedback.scope,
              status: req.body.feedback.status,
              type: req.body.feedback.type,
              reason: req.body.feedback.reason,
              timeMillis: new Date().getTime(),
            },
          } as FeedbackRequest,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Sardine-Client-Id": req.currentUser.organisation_client_id,
              "X-Sardine-Internal-Key": process.env.SARDINE_API_INTERNAL_KEY,
            },
          }
        );
        return res.status(201).json({});
      } catch (err: unknown) {
        captureException(err);

        if (axios.isAxiosError(err) && err.response) {
          return res.status(err.response.status).json({ error: err.response.data.message });
        }

        if (err instanceof Error) {
          return res.status(500).json({ error: err.message });
        }

        return res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  return router;
};

export default feedbacksRouter;
