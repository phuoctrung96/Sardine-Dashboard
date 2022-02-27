import { FeatureItem, DATA_TYPES } from "../featureItem";

const transactionAggregationFeaturesOverDays = [
  new FeatureItem("7DAYS"),
  new FeatureItem("30DAYS"),
  new FeatureItem("60DAYS"),
  new FeatureItem("90DAYS"),
];

const transactionAggregationFeatures = [
  new FeatureItem(
    "ZScore",
    transactionAggregationFeaturesOverDays,
    "3.0",
    DATA_TYPES.float,
    false,
    "Z-Score of amount for transaction type (card, bank or crypto) (requires minimum 10 transactions at aggregation level)"
  ),
  new FeatureItem(
    "DifferenceFromMean",
    transactionAggregationFeaturesOverDays,
    "100.0",
    DATA_TYPES.float,
    false,
    "Difference between amount and mean for transaction type (card, bank or crypto) (requires minimum 10 transactions at aggregation level)"
  ),
];

export const transactionAggregationFeatureItems = [
  new FeatureItem("ClientAggregation", transactionAggregationFeatures),
  new FeatureItem("CustomerAggregation", transactionAggregationFeatures),
];
