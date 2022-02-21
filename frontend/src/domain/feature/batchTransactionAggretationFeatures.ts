import { DATA_TYPES, FeatureItem } from "../featureItem";

const batchTransactionAggregationDays = [new FeatureItem("30DAYS")];

export const batchTransactionAggregationFeatures = [
  new FeatureItem(
    "CountZScore",
    batchTransactionAggregationDays,
    "3.0",
    DATA_TYPES.float,
    false,
    "Z-Score of the daily transaction count, relative to average of daily transaction counts over aggregation period"
  ),
  new FeatureItem(
    "CountDifferenceFromMean",
    batchTransactionAggregationDays,
    "100.0",
    DATA_TYPES.float,
    false,
    "Difference of the daily transaction count and average of daily transaction counts over aggregation period"
  ),
  new FeatureItem(
    "AmountZScore",
    batchTransactionAggregationDays,
    "3.0",
    DATA_TYPES.float,
    false,
    "Z-Score of the daily transaction total, relative to average of daily transaction totals over aggregation period"
  ),
  new FeatureItem(
    "AMountDifferenceFromMean",
    batchTransactionAggregationDays,
    "100.0",
    DATA_TYPES.float,
    false,
    "Difference of the daily transaction total and average of daily transaction totals over aggregation period"
  ),
];
