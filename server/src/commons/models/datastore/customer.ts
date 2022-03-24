import { Query } from "@google-cloud/datastore";
import {
  BankDetailsResponse,
  BankKind,
  BANK_ACCOUNT_TYPE,
  CardDetailsResponse,
  CardKind,
  CARD_LEVEL,
  CryptoDetailsResponse,
  CryptoKind,
  dedupeArrayObject,
} from "sardine-dashboard-typescript-definitions";
import { RunQueryInfo } from "@google-cloud/datastore/build/src/query";
import dayjs from "dayjs";
import { datastore } from "../../../service/datastore-service";
import { BANK_KIND, CARD_KIND, CRYPTO_KIND } from "./common";
import { Transaction } from "./transaction";
import { CLIENT_ID_FIELD, CUSTOMER_ID_FIELD } from "../../../constants";

const ds = datastore;

export class Customer {
  public static async getBanksCustomer(clientId: string, customerId: string): Promise<BankKind[]> {
    const dataStoreQuery: Query = ds
      .createQuery(BANK_KIND)
      .filter(CUSTOMER_ID_FIELD, customerId)
      .filter(CLIENT_ID_FIELD, clientId);

    const [entities]: [BankKind[], RunQueryInfo] = await ds.runQuery(dataStoreQuery);
    return entities || [];
  }

  public static async getCryptoCustomer(clientId: string, customerId: string): Promise<CryptoKind[]> {
    const dataStoreQuery: Query = ds
      .createQuery(CRYPTO_KIND)
      .filter(CUSTOMER_ID_FIELD, customerId)
      .filter(CLIENT_ID_FIELD, clientId);

    const [entities]: [CryptoKind[], RunQueryInfo] = await ds.runQuery(dataStoreQuery);
    return entities || [];
  }

  public static async getCardCustomer(clientId: string, customerId: string): Promise<CardKind[]> {
    const dataStoreQuery: Query = ds
      .createQuery(CARD_KIND)
      .filter(CUSTOMER_ID_FIELD, customerId)
      .filter(CLIENT_ID_FIELD, clientId);
    const [entities]: [CardKind[], RunQueryInfo] = await ds.runQuery(dataStoreQuery);
    return entities || [];
  }

  public static async getCryptoDetailsCustomer(clientId: string, customerId: string): Promise<CryptoDetailsResponse[]> {
    const cryptos = await Customer.getCryptoCustomer(clientId, customerId);
    const result: CryptoDetailsResponse[] = [];
    cryptos.forEach((crypto) => {
      result.push({
        address: crypto.crypto_address,
        addressRiskScore: crypto?.address_risk_level,
        categories: crypto.categories?.join(","),
        currency_code: crypto.currency_code,
        userRiskScore: crypto.user_risk_level,
      });
    });

    return dedupeArrayObject<CryptoDetailsResponse>(
      result,
      ["currency_code", "address", "addressRiskScore", "userRiskScore", "categories"],
      true
    );
  }

  public static async getCardDetailsCustomer(clientId: string, customerId: string): Promise<CardDetailsResponse[]> {
    const cards = await Customer.getCardCustomer(clientId, customerId);
    const result: CardDetailsResponse[] = [];

    cards.forEach((card) => {
      result.push({
        level: card.level,
        card_type: card.type,
        first6: card.first_6,
        is_prepaid: card.level === CARD_LEVEL.Prepaid,
        issuer_bank: card.issuer,
        issuer_brand: card.brand,
        last4: card.last_8,
      });
    });

    return dedupeArrayObject<CardDetailsResponse>(result, [
      "level",
      "card_type",
      "first6",
      "last4",
      "issuer_brand",
      "is_prepaid",
    ]);
  }

  public static async getBankDetailsCustomer(clientId: string, customerId: string): Promise<BankDetailsResponse[]> {
    const banks = await Customer.getBanksCustomer(clientId, customerId);
    const transactions = await Transaction.getTransactionsCustomer(clientId, customerId);

    const result: BankDetailsResponse[] = [];

    // TODO: Maybe in the future we should get only the data from Bank kind. For now we get all the data from Transaction kind too since we don't have all the data grouped there.
    transactions.forEach((transaction) => {
      banks.forEach((bank) => {
        const accountType = BANK_ACCOUNT_TYPE[transaction.account_type || bank.account_type || 0];
        result.push({
          account_type: accountType,
          balance: transaction.bank_balance || 0,
          balance_currency: transaction.bank_balance_currency || "",
          total_amount_spent: transaction.bank_total_amount_spent,
          routing_number: transaction.routing_number || bank.routing_number,
          account_number: transaction.account_number || bank.account_number,
          amount: transaction.amount,
          currency_code: transaction.currency_code,
          item_category: transaction.item_category,
          created_at_millis: {
            value: dayjs(transaction.timestamp).format(),
          },
          action_type: transaction.action_type,
          type: transaction.payment_method || "",
        });
      });
    });

    return dedupeArrayObject<BankDetailsResponse>(result, [
      "account_number",
      "routing_number",
      "account_type",
      "balance",
      "balance_currency",
      "total_amount_spent",
    ]);
  }
}
