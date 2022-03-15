import { Query } from "@google-cloud/datastore";
import moment from "moment";
import { FeedbackKind, FeedbacksRequestBody } from "sardine-dashboard-typescript-definitions";
import { firebaseAdmin } from "../../firebase";
import { FEEDBACK_KIND } from "./common";

const ds = firebaseAdmin.datastore;

export class Feedback {
  public static async getFeedbackList(sessionKey: string): Promise<Array<FeedbackKind>> {
    const dataStoreQuery: Query = ds.createQuery(FEEDBACK_KIND).filter("SessionKey", sessionKey).limit(100);

    const [entities] = await ds.runQuery(dataStoreQuery);
    if (entities.length === 0) {
      return [];
    }

    return entities;
  }

  public static async getFeedbacks(filters: FeedbacksRequestBody) {
    const { startDate, endDate, page = 0, rows = 15 } = filters;

    const dsQuery = ds.createQuery(FEEDBACK_KIND);

    if (startDate) dsQuery.filter("CustomerFeedback.CreatedAtMillis", ">=", moment(startDate).unix() * 1000);
    if (endDate) dsQuery.filter("CustomerFeedback.CreatedAtMillis", "<=", moment(endDate).unix() * 1000);

    dsQuery.offset(page * rows).limit(rows);

    const [entities, info] = await ds.runQuery(dsQuery);
    const isLast = info.moreResults === "NO_MORE_RESULTS";

    return { feedbacks: (entities as FeedbackKind[]) ?? [], isLast };
  }
}
