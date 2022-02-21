import { arrayCustomerCheckpoints, FeatureItem } from "../domain/featureItem";
import { issuingCheckpoints } from "../domain/dataProvider";

const DURATION_VALUES = ["all", "min", "mins", "hrs", "day", "days", "mth", "mths"] as const;

const kCustomActions = "custom_actions";
export const ADD_CUSTOM = "+ add custom";
export const saveActionToStorage = (action: string): void => {
  const actions = localStorage.getItem(kCustomActions) || "";
  localStorage.setItem(kCustomActions, `${actions}${actions.length > 0 ? "," : ""}${action}`);
};

const kCustomActionlevels = "custom_levels";
export const saveActionLevelToStorage = (value: string): void => {
  const levels = localStorage.getItem(kCustomActionlevels) || "";
  localStorage.setItem(kCustomActionlevels, `${levels}${levels.length > 0 ? "," : ""}${value}`);
};

export const getRiskValues = (): string[] => {
  const levels = localStorage.getItem(kCustomActionlevels) || "";
  const customLevels = levels.length > 0 ? levels.split(",") : [];

  return ["low", "medium", "high", "very_high", ...customLevels, ADD_CUSTOM];
};

export interface Reason {
  title: string;
  items: string[];
}

// Fatures to prepare reason code
export const getReasonCodeData = (): Reason[] => [
  {
    title: "ToStringArray",
    items: [],
  },
  {
    title: "IntToString",
    items: [],
  },
  {
    title: "EmptyStringArray()",
    items: [],
  },
  {
    title: "Phone",
    items: ["ReasonCodes"],
  },
  {
    title: "Bank",
    items: ["ResponseCode", "AccountResponseCode"],
  },
  {
    title: "Email",
    items: ["RelevantInfoId", "DomainRelevantInfoId"],
  },
];

export const getActionData = (isSuperAdmin: boolean, checkpoint: string): string[] => {
  const actions = localStorage.getItem(kCustomActions) || "";
  const customActions = actions.length > 0 ? actions.split(",") : [];

  if (arrayCustomerCheckpoints.includes(checkpoint.toLowerCase())) {
    const defaultActions = ["riskLevel", "transaction.riskLevel", "transaction.amlRiskLevel"];
    return isSuperAdmin
      ? defaultActions
          .concat([
            "amlRiskLevel",
            "amlReportLevel",
            "emailLevel",
            "emailDomainLevel",
            "phoneLevel",
            "pepLevel",
            "sanctionLevel",
            "adverseMediaLevel",
            "bankLevel",
          ])
          .concat(customActions)
          .sort()
      : defaultActions.concat(customActions).sort();
  }

  if (issuingCheckpoints.includes(checkpoint.toLowerCase())) {
    return ["riskLevel"].concat(customActions).sort();
  }

  return ["behaviorBiometricLevel", "riskLevel"].concat(customActions).sort();
};

export const isDurationValue = (s: string): boolean =>
  DURATION_VALUES.filter((d) => s.replace(/[0-9]/g, "").toLowerCase() === d).length > 0;

export const rulesForDataDictionary = (rules: FeatureItem[], parentTitle: string, isDemo = false): FeatureItem[] => {
  const rulesData: FeatureItem[] = [];
  rules.forEach((r) => {
    const isDurations = r.items.map((i) => isDurationValue(i.title)).includes(true);
    if (r.items.length > 0 && !isDurations) {
      rulesData.push(...rulesForDataDictionary(r.items, parentTitle.length > 0 ? `${parentTitle}.${r.title}` : r.title, isDemo));
    } else {
      const rule = { ...r };
      rule.items = [];
      if (parentTitle.length > 0) {
        rule.title = `${parentTitle}.${rule.title}`;
      }
      rulesData.push(rule);
    }
  });

  const data = isDemo ? rulesData : rulesData.filter((ruleData) => ruleData.isDemo === false);
  return data;
};
