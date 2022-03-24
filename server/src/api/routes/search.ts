import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import {
  UserAggregationsRequestBody,
  SearchDetailsRequestBody,
  searchUrls,
  FetchDeviceProfileRequestBody,
  convertDeviceKindToProfile,
} from "sardine-dashboard-typescript-definitions";
import { mw } from "../../commons/middleware";
import { db } from "../../commons/db";
import { captureException } from "../../utils/error-utils";
import { Devices } from "../../commons/models/datastore/devices";
import { RequestWithCurrentUser } from "../request-interface";

const router = express.Router();
const { healthCheckRoute, getDeviceProfileRoute, getDeviceDetailsRoute, getUserAggregationsRoute } = searchUrls.routes;

const searchRouter = () => {
  router[healthCheckRoute.httpMethod](healthCheckRoute.path, (_req: Request, res: Response) => res.send("OK"));

  router[getDeviceProfileRoute.httpMethod](
    getDeviceProfileRoute.path,
    [body("organisation").exists().isString(), body("sessionKey").exists().isString()],
    mw.validateRequest,
    mw.requireOrganisationAccess,
    async (req: RequestWithCurrentUser<FetchDeviceProfileRequestBody>, res: Response, _next: NextFunction) => {
      const { sessionKey, organisation, clientId } = req.body;

      const client_id = clientId || (await db.organisation.getClientId(organisation));

      try {
        const response = await Devices.getDeviceDetails(client_id || "", sessionKey);

        if (response) {
          return res.json({
            result: {
              profile: convertDeviceKindToProfile(response),
            },
          });
        }
      } catch (error) {
        captureException(error);
        return res.status(400).json({ error: "DS_QUERY_ERROR" });
      }
    }
  );

  router[getDeviceDetailsRoute.httpMethod](
    getDeviceDetailsRoute.path,
    [
      body("startTimestampSeconds").exists().isInt(),
      body("endTimestampSeconds").exists().isInt(),
      body("organisation").exists().isString(),
      body("offset").exists().isInt(),
      body("limit").exists().isInt(),
    ],
    mw.validateRequest,
    mw.requireOrganisationAccess,
    async (req: RequestWithCurrentUser<SearchDetailsRequestBody>, res: Response, _next: NextFunction) => {
      const { startTimestampSeconds, endTimestampSeconds, organisation, offset, limit, filters } = req.body;

      const client_id = (await db.organisation.getClientId(organisation)) || "";
      const f: { [key: string]: string } = filters || {};

      try {
        const response = await Devices.queryByTimeRange(client_id, startTimestampSeconds, endTimestampSeconds, f, offset, limit);
        return res.json({ result: response.map((r) => convertDeviceKindToProfile(r)) });
      } catch (error) {
        captureException(error);
        return res.status(400).json({ error: "DS_QUERY_ERROR" });
      }
    }
  );

  router[getUserAggregationsRoute.httpMethod](
    getUserAggregationsRoute.path,
    [body("organisation").exists().isString(), body("userId").exists().isString()],
    mw.validateRequest,
    mw.requireOrganisationAccess,
    async (req: RequestWithCurrentUser<UserAggregationsRequestBody>, res: Response, _next: NextFunction) => {
      const { organisation, userId, clientId } = req.body;

      const client_id = clientId || (await db.organisation.getClientId(organisation)) || "";
      try {
        const response = await Devices.getUserAggregation(client_id, userId);
        return res.json({ result: response });
      } catch (e) {
        captureException(e);
        return res.status(400).json({ error: "DS_QUERY_ERROR" });
      }
    }
  );

  return router;
};

export default searchRouter;
