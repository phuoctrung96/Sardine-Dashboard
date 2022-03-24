import { Query } from "@google-cloud/datastore";
import { RunQueryInfo } from "@google-cloud/datastore/build/src/query";
import { TransactionKind } from "sardine-dashboard-typescript-definitions";
import { CLIENT_ID_FIELD, CUSTOMER_ID_FIELD } from "../../../constants";
import { datastore } from "../../../service/datastore-service";
import { TRANSACTION_KIND } from "./common";

const ds = datastore;

export class Transaction {
  public static async getTransactionsCustomer(clientId: string, customerId: string, limit = 10): Promise<TransactionKind[]> {
    const dataStoreQuery: Query = ds
      .createQuery(TRANSACTION_KIND)
      .filter(CUSTOMER_ID_FIELD, customerId)
      .filter(CLIENT_ID_FIELD, clientId)
      .limit(limit);

    const [entities = []]: [TransactionKind[], RunQueryInfo] = await ds.runQuery(dataStoreQuery);
    return entities;
  }
}
