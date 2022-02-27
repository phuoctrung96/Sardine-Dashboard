import { FeatureItem, DATA_TYPES, newChild, stringChild, boolChild, intChild } from "../featureItem";
import { batchTransactionAggregationFeatures } from "./batchTransactionAggretationFeatures";

export const issuingFeatures = [
  new FeatureItem("Merchant", [
    newChild("Mcc", "5734", DATA_TYPES.string, "Merchant category code for merchant", false),
    newChild("Name", "Corner Book Shop", DATA_TYPES.string, "Name of merchant", false),
  ]),
  new FeatureItem("Terminal", [
    newChild("Type", "POS_TERMINAL", DATA_TYPES.string, "Terminal type", false),
    newChild("Operator", "CUSTOMER_OPERATED", DATA_TYPES.string, "Terminal type", false),
    boolChild("OnPremise", "On-premise transaction", false),
    boolChild("PinCapability", "Terminal has PIN entry capability", false),
  ]),
  new FeatureItem("EntryInfo", [
    stringChild(
      "PAN",
      "How PAN was entered - manual, emv_chip, qr_or_barcode, contactless, magstripe, applepay, googlepay, or other"
    ),
    boolChild("PinEntered", "PIN was entered", false),
    boolChild("CardPresent", "Card-present transaction", false),
    boolChild("CardHolderPresent", "Cardholder was present during transaction", false),
  ]),
  new FeatureItem("Validation", [
    boolChild("AvsZipMatch", "AVS zipcode match", false),
    boolChild("AvsStreetMatch", "AVS street match", false),
    boolChild("CvvMatch", "CVV match", false),
  ]),
  new FeatureItem("FraudScore", [
    intChild("NetworkScore", "Network fraud score", false),
    newChild("PartnerScore", "0.86", DATA_TYPES.float, "Partner fraud score", false),
  ]),
  new FeatureItem("Transaction", [
    newChild("Amount", "0.86", DATA_TYPES.float, "Transaction amount in local currency", false),
    newChild("AmountUsd", "0.86", DATA_TYPES.float, "Transaction amount in USD", false),
    newChild("CurrencyCode", "USD", DATA_TYPES.string, "Transaction curency", false),
    boolChild("ForeignTransaction", "Transaction was performed in a country other than the cardholder's home country", false),
    boolChild("Recurring", "Transaction was previously authorized as a recurring transaction", false),
    intChild("HourOfDay", "Integer indicating hour of day (ranging from 0 to 23). Missing values are indicated by -1.", false),
    intChild("DayOfMonth", "Integer indicating day of month (ranging from 1 to 31). Missing values are indicated by -1.", false),
    stringChild("DayOfWeek", 'String indicating day of week (e.g. "Monday"). Missing values are indicated by the empty string.'),
  ]),
  new FeatureItem("BatchTransactionAggregation", [
    new FeatureItem("CustomerAggregation", batchTransactionAggregationFeatures),
    new FeatureItem("CustomerMccAggregation", batchTransactionAggregationFeatures),
  ]),
  new FeatureItem("CardPresentGaps", [
    intChild("TimeSinceCardWasUsedInAnotherCity", "Time between card-present transactions in different cities", false),
    intChild("TimeSinceCardWasUsedInAnotherCountry", "Time between card-present transactions in different countries", false),
    intChild("TimeSinceCardWasUsedInAnotherRegion", "Time between card-present transactions in different regions", false),
    intChild(
      "TimeSinceCardWasUsedInAnotherPostalCode",
      "Time between card-present transactions in different postal codes",
      false
    ),
  ]),
  new FeatureItem("UserAggregation", [
    new FeatureItem(
      "InAmount",
      [
        new FeatureItem("ALL"),
        new FeatureItem("30MINS"),
        new FeatureItem("24HRS"),
        new FeatureItem("7DAYS"),
        new FeatureItem("30DAYS"),
        new FeatureItem("60DAYS"),
        new FeatureItem("90DAYS"),
      ],
      "1",
      DATA_TYPES.int,
      false,
      "Total amount of incoming transactions"
    ),
    new FeatureItem(
      "OutAmount",
      [
        new FeatureItem("ALL"),
        new FeatureItem("30MINS"),
        new FeatureItem("24HRS"),
        new FeatureItem("7DAYS"),
        new FeatureItem("30DAYS"),
        new FeatureItem("60DAYS"),
        new FeatureItem("90DAYS"),
      ],
      "1",
      DATA_TYPES.int,
      false,
      "Total amount of outgoing transactions"
    ),
    new FeatureItem(
      "InCount",
      [
        new FeatureItem("ALL"),
        new FeatureItem("30MINS"),
        new FeatureItem("24HRS"),
        new FeatureItem("7DAYS"),
        new FeatureItem("30DAYS"),
        new FeatureItem("60DAYS"),
        new FeatureItem("90DAYS"),
      ],
      "1",
      DATA_TYPES.int,
      false,
      "Total count of incoming transactions"
    ),
    new FeatureItem(
      "OutCount",
      [
        new FeatureItem("ALL"),
        new FeatureItem("30MINS"),
        new FeatureItem("24HRS"),
        new FeatureItem("7DAYS"),
        new FeatureItem("30DAYS"),
        new FeatureItem("60DAYS"),
        new FeatureItem("90DAYS"),
      ],
      "1",
      DATA_TYPES.int,
      false,
      "Total count of outgoing transactions"
    ),
  ]),
];
