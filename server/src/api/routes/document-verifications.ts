import express, { Response } from "express";
import { param, query } from "express-validator";
import {
  documentVerificationsUrls,
  AnyTodo,
  SARDINE_ADMIN,
  MULTI_ORG_ADMIN,
  isFailure,
  getFailureResult,
  getSuccessResult,
} from "sardine-dashboard-typescript-definitions";
import { db } from "../../commons/db";
import { mw } from "../../commons/middleware";
import { RequestWithCurrentUser } from "../request-interface";
import { ALLOWLISTED_FILTERS, DocumentVerficationDS } from "../../commons/models/datastore/document-verifications";
import { DOC_IMG_KEYS, generateSignedDocumentVerificationImages } from "../../commons/document-verifications";
import { captureException, handleClientIDNotFoundError } from "../../utils/error-utils";
import { fetchDocumentVerification } from "../../use-case/document-verifications-use-case";
import { COOKIE_SESSION } from "../../constants";

const router = express.Router();

const { list: listUrl, images: getImagesUrl, details: detailsUrl } = documentVerificationsUrls.routes;

export const fetchDocumentVerificatonsImages = (documentVerifications: AnyTodo[]) =>
  Promise.all(
    documentVerifications.map((d) => {
      const asynFn = async () => {
        const images = await generateSignedDocumentVerificationImages(d);

        return { ...d, ...images };
      };

      return asynFn();
    })
  );

const documentVerificationsRouter = () => {
  router[detailsUrl.httpMethod](
    detailsUrl.path,
    param("id").isString(),
    [mw.validateRequest, mw.requireLoggedIn],
    async (
      req: RequestWithCurrentUser<AnyTodo, AnyTodo, AnyTodo>,
      res: Response
    ): Promise<Response<AnyTodo, Record<string, AnyTodo>> | void> => {
      const sessionId = req.cookies[COOKIE_SESSION];
      const result = await fetchDocumentVerification(req.params.id, sessionId);
      if (isFailure(result)) {
        const failureValue = getFailureResult(result);
        captureException(failureValue.message);
        return res.status(404).json({ error: failureValue.message });
      }
      const successResult = getSuccessResult(result);

      return res.json({ ...successResult.documentVerification, ...successResult.images });
    }
  );

  router[listUrl.httpMethod](
    listUrl.path,
    query("page_cursor").optional().isString(),
    query("client_id").optional().isUUID(),
    query("customer_id").optional().isString(),
    query("verification_id").optional().isString(),
    query("session_key").optional().isString(),
    query("limit").optional().isInt(),
    query("load_image").optional().isBoolean(),
    [mw.validateRequest, mw.requireLoggedIn],
    async (
      req: RequestWithCurrentUser<{}, AnyTodo>,
      res: Response
    ): Promise<void | Response<AnyTodo, Record<string, AnyTodo>>> => {
      const pageCursor: string | undefined = req.query.page_cursor as string | undefined;

      let clientId = req.query.client_id ? String(req.query.client_id) : undefined;
      try {
        clientId =
          req.currentUser?.user_role === SARDINE_ADMIN || req.currentUser?.user_role === MULTI_ORG_ADMIN
            ? clientId
            : await db.superadmin.getClientId(String(req.currentUser?.organisation));
      } catch (err) {
        return handleClientIDNotFoundError(err as Error, res);
      }

      const limit: number = req.query.limit ? parseInt(req.query.limit as string, 10) : 60;
      const filters: { [key: string]: string } = {};
      ALLOWLISTED_FILTERS.forEach((filterName) => {
        filters[filterName] = req.query[filterName] as string;
      });

      if (clientId) filters.client_id = clientId;

      const data = await DocumentVerficationDS.queryByFilters(filters, pageCursor, limit);

      if (!req.query.load_image) {
        res.json(data);
        return undefined;
      }

      const documentVerificationsWithImages = await fetchDocumentVerificatonsImages(data.documentVerifications);

      res.json({
        ...data,
        documentVerifications: documentVerificationsWithImages,
      });
      return undefined;
    }
  );
  router[getImagesUrl.httpMethod](
    getImagesUrl.path,
    ...DOC_IMG_KEYS.map((image) => query(image).optional().isString()),
    [mw.validateRequest, mw.requireLoggedIn],
    async (req: RequestWithCurrentUser, res: Response) => {
      const result = await generateSignedDocumentVerificationImages(req.query);

      res.json(result);
    }
  );
  return router;
};

export default documentVerificationsRouter;
