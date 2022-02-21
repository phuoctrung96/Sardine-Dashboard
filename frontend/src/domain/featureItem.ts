import { CHECKPOINTS } from "sardine-dashboard-typescript-definitions";

const CUSTOMER_CHECKPOINTS = [
  CHECKPOINTS.Customer,
  CHECKPOINTS.AML,
  CHECKPOINTS.AMLBank,
  CHECKPOINTS.AMLIssuer,
  CHECKPOINTS.AMLCrypto,
  CHECKPOINTS.Onboarding,
  CHECKPOINTS.Payment,
  CHECKPOINTS.Withdrawal,
  CHECKPOINTS.ACH,
];

export const arrayCustomerCheckpoints = CUSTOMER_CHECKPOINTS.map((c) => c.toLowerCase());
export const DATA_TYPES = {
  int: "int",
  float: "float",
  bool: "bool",
  string: "string",
  stringarray: "array",
  function: "function",
} as const;

export class FeatureItem {
  title = "";

  items: FeatureItem[] = [];

  sample = "";

  dataType: string = DATA_TYPES.int;

  isDemo = true;

  // sometime we want to hide live features and make it only avaialble to admin and backend code.
  isHidden = false;

  description = "N/A";

  constructor(title: string, items: FeatureItem[] = [], sample = "", dataType = "", isDemo = true, description = "N/A") {
    this.title = title;
    this.items = items;
    this.sample = sample;
    this.dataType = dataType;
    this.isDemo = isDemo;
    this.description = description;
  }
}

export const newChild = (title: string, sample: string, type: string, description = "N/A", isDemo = true): FeatureItem =>
  new FeatureItem(title, [], sample, type, isDemo, description);

export const stringChild = (title: string, description = "N/A", isDemo = false): FeatureItem =>
  new FeatureItem(title, [], '""', DATA_TYPES.string, isDemo, description);

export const intChild = (title: string, description = "N/A", isDemo = true): FeatureItem =>
  new FeatureItem(title, [], "1", DATA_TYPES.int, isDemo, description);

export const boolChild = (title: string, description = "N/A", isDemo = true): FeatureItem =>
  new FeatureItem(title, [], "true", DATA_TYPES.bool, isDemo, description);

export const floatChild = (title: string, description = "N/A", isDemo = false): FeatureItem =>
  new FeatureItem(title, [], '""', DATA_TYPES.float, isDemo, description);
