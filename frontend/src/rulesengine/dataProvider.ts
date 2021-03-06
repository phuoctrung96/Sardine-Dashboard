import { CHECKPOINTS } from "sardine-dashboard-typescript-definitions";
import { getDeviceRelatedFeaturesList } from "./feature/deviceRelatedFeaturesList";
import { getDeviceFeatures } from "./feature/deviceFeatures";
import { getSessionFeatures } from "./feature/sessionFeatures";
import { issuingFeatures } from "./feature/issuingFeatures";
import { paymentMethodFeatures } from "./feature/paymentMethodFeatures";
import { taxIdFeatures } from "./feature/taxIdFeatures";
import { userFeatures } from "./feature/userFeatures";
import {
  FeatureItem,
  DATA_TYPES as DT,
  arrayCustomerCheckpoints,
  newChild,
  intChild,
  stringChild,
  boolChild,
} from "./featureItem";
import { getCustomFeatures } from "./feature/customFeatures";
import { transactionAggregationFeatureItems } from "./feature/transactionAggregationFeatures";

export const DATA_TYPES = DT;
export type DataType = typeof DATA_TYPES[keyof typeof DATA_TYPES];

export const JARO_WINKLER_DISTANCE = "Jaro-Winkler distance";
export const RELATIONAL_FUNCTIONS = [
  "GreaterThanEqualsTo",
  "GreaterThan",
  "LessThanEqualsTo",
  "LessThan",
  "NotEqualsTo",
  "EqualsTo", // EqualsTo is intentionally at the end of the list as it can override >=, <= and != functions
];

export const ARITHMETIC_FUNCTIONS = ["AdditionOf", "SubtractionOf", "MultiplicationOf", "DivisionOf"];
export const NUMERIC_FUNCTIONS_WITH_STRING_SUPPORTED = [JARO_WINKLER_DISTANCE, "NotEqualsTo", "EqualsTo"];

export interface FunctionChild {
  title: string;
  sample: string;
  value: string;
  description: string;
  dataType: string;
  hasOperator: boolean;
  functions: FunctionChild[];
}

export interface BatchRuleData {
  BatchDuration: string;
  BatchCount: string;
}

const functionChild = (
  title: string,
  sample: string,
  value: string,
  description: string,
  dataType: string,
  hasOperator: boolean,
  functions: FunctionChild[] = []
) => ({
  title,
  sample,
  value,
  description,
  dataType,
  hasOperator,
  functions,
});

export const FUNCTIONS = "Functions";
export const ARITHMETIC = "Arithmetic";
export const RELATIONAL = "Relational";
export const MULTI_FEATURE_FUNCTIONS: string[] = [
  JARO_WINKLER_DISTANCE,
  ...ARITHMETIC_FUNCTIONS.map((key) => `${ARITHMETIC}.${key}`),
  ...RELATIONAL_FUNCTIONS.map((key) => `${RELATIONAL}.${key}`),
];
export const supportedFunctions: FunctionChild[] = [
  functionChild(
    ARITHMETIC,
    "",
    "",
    "",
    DATA_TYPES.float,
    true,
    ARITHMETIC_FUNCTIONS.map((operator) =>
      functionChild(
        operator,
        `${operator}(x,y) == 1.0`,
        operator,
        `${operator} is the function to apply arithmetic operations`,
        DATA_TYPES.float,
        true
      )
    )
  ),
  functionChild(
    RELATIONAL,
    "",
    "",
    "",
    DATA_TYPES.bool,
    false,
    RELATIONAL_FUNCTIONS.map((operator) =>
      functionChild(
        operator,
        `${operator}(x,y) == true`,
        operator,
        `${operator} is the function to compare two values`,
        DATA_TYPES.bool,
        false
      )
    )
  ),
  functionChild(
    JARO_WINKLER_DISTANCE,
    "0.3",
    "JaroWinkler",
    "Jaro???Winkler distance is a string metric measuring an edit distance between two sequences",
    DATA_TYPES.float,
    true
  ),
  functionChild(
    "Contains",
    "mailinator",
    "Contains",
    "Contains is the function to check partial equality within the value",
    DATA_TYPES.string,
    false
  ),
  functionChild(
    "HasPrefix",
    "+1",
    "HasPrefix",
    "HasPrefix is the function to check prefix of the value",
    DATA_TYPES.string,
    false
  ),
  functionChild("HasSuffix", "", "HasSuffix", "HasSuffix is the function to check suffix of the value", DATA_TYPES.string, false),
];

export const getHasOperator = (val: string): boolean => {
  let hasOperator = true;

  supportedFunctions.forEach((f) => {
    if (f.functions.length > 0) {
      f.functions.forEach((subFunction) => {
        if (val.includes(subFunction.value)) {
          hasOperator = subFunction.hasOperator;
        }
      });
    } else if (val.includes(f.value)) {
      hasOperator = f.hasOperator;
    }
  });

  return hasOperator;
};

export const OPERATORS = [">", ">=", "<", "<=", "==", "!=", " in ", " not in "] as const;

export const DROP_DOWN_BG = "#EAEDF2";
export const FEATURE_SEPARATOR = "#";

export const DROPDOWN_TYPES = {
  Rules: "condition",
  Operator: "operator",
  ReasonCode: "reasonCode",
  ReasonOperator: "reasonOperator",
  RiskLevel: "riskLevel",
  RiskValue: "riskValue",
  Checkpoint: "check Point",
  Organization: "organization",
  Queue: "select queue",
  QueueUser: "assign user",
} as const;
export type DropdownType = typeof DROPDOWN_TYPES[keyof typeof DROPDOWN_TYPES];
const DROPDOWN_TYPE_VALUES = Object.values(DROPDOWN_TYPES);
export const isDropdownType = (type: string): type is DropdownType => type in DROPDOWN_TYPE_VALUES;

export const BATCH_RULE_DURATIONS = ["7DAYS", "30DAYS", "60DAYS", "90DAYS"] as const;

export type CheckPoint = typeof CHECKPOINTS[keyof typeof CHECKPOINTS];

export const issuingCheckpoints = [CHECKPOINTS.IssuingRisk].map((c) => c.toLowerCase());

const shouldVisible = (i: FeatureItem, isDemoMode: boolean, isSuperAdmin: boolean): boolean => {
  if (isDemoMode) {
    // In demo UI everything is visible
    return true;
  }
  if (i.isDemo && i.items.length === 0) {
    // In non-demo mode, hide demo feature
    return false;
  }
  if (!i.items || i.items.length === 0) {
    // leaf node, show it unless it's marked as hidden
    return !i.isHidden || isSuperAdmin;
  }
  if (!i.isDemo) {
    // live feature, show it unless it's marked as hidden
    return !i.isHidden || isSuperAdmin;
  }
  // if any of child should visible, so does parent.
  return i.items.filter((f) => shouldVisible(f, isDemoMode, isSuperAdmin)).length > 0;
};

const filterVisibleFeatures = (items: FeatureItem[], isDemoMode: boolean, isSuperAdmin: boolean): FeatureItem[] => {
  const shouldVisibleBound = (i: FeatureItem) => shouldVisible(i, isDemoMode, isSuperAdmin);
  const liveFeatures = items.filter((f) => f.items.filter(shouldVisibleBound).length > 0 || !f.isDemo);
  liveFeatures.forEach((f) => {
    // eslint-disable-next-line no-param-reassign
    f.items = f.items.filter(shouldVisibleBound);
  });
  return liveFeatures;
};

// Features to prepare rule condition
export const getRulesData = (
  isDemoMode: boolean,
  checkpoint: string,
  isSuperAdmin: boolean,
  organization?: string
): FeatureItem[] => {
  if (issuingCheckpoints.includes(checkpoint.toLowerCase())) {
    return [
      ...filterVisibleFeatures(issuingFeatures, isDemoMode, isSuperAdmin),
      new FeatureItem(FUNCTIONS, [], "", DATA_TYPES.function, false, "Custom functions to support advanced operations"),
    ];
  }

  const featuresArray = [
    new FeatureItem("Device", getDeviceFeatures(checkpoint)),
    new FeatureItem("Session", getSessionFeatures(checkpoint)),
    new FeatureItem("Biometric", [
      intChild("LTMAutoFill", "Autofill data from user's interaction with form(s)", false),
      intChild("LTMExpertKey", "", false),
      intChild("LTMCopyPaste", "Copy Paste data from user's interaction with form(s)", false),
      intChild("HesitationPercentageLTM", "Number of hesitation while filling the form(s)", false),
      intChild("NumDistractionEvents", "Number of distractions while filling the form(s)", false),
    ]),
    new FeatureItem("IP", [
      newChild("V4Address", "192.0.2.1", DATA_TYPES.string, "IPV4 address"),
      newChild("V6Address", "18:36:F3:98:4F:9A", DATA_TYPES.string, "IPV6 address"),
      boolChild("Proxy", "If IP address is known to be Proxy"),
      boolChild("Vpn", "If IP address is known to be VPN"),
      newChild("Type", "Fixed Line ISP", DATA_TYPES.string, "Type of IP like Corporate, Fixed Line ISP", false),
      newChild("City", "SF", DATA_TYPES.string, "City from IP Address", false),
      newChild("Region", "CA", DATA_TYPES.string, "Region from IP Address", false),
      newChild("Country", "US", DATA_TYPES.string, "2 digit Country Code from IP Address", false),
      newChild("UsageType", "COM", DATA_TYPES.string, "UsageType from IP2Location i.e. COM, ORG, GOV, EDU etc", false),
    ]),
    new FeatureItem("GPS", [
      newChild("City", "San Francisco", DATA_TYPES.string, "City from GPS co-ordinates", false),
      newChild("Region", "CA", DATA_TYPES.string, "Region from GPS co-ordinates", false),
      newChild("Country", "US", DATA_TYPES.string, "2 digit Country Code from GPS co-ordinates", false),
      newChild("MockLevel", "low", DATA_TYPES.string, "Likelihood of GPS coordinate being mocked - low, medium or high", false),
    ]),
    new FeatureItem("User", userFeatures),
    new FeatureItem("Email", [
      newChild("RiskLevel", "high", DATA_TYPES.string, "Get level from email", false),
      newChild("DomainScore", "1", DATA_TYPES.int, "Get level of email domain. higher is better"),
      boolChild("OnboardingMismatch", "Match of user-provided onboarding information to data we get from email"),
      newChild("FirstSeenAt", "1617137009018", DATA_TYPES.string, "Time in unix timestamp when the email was first seen", false),
      intChild("EmailAddressAge", "age of the email address", false),
      intChild("FirstVerificationDays", "number days back this email was verified on email intelligence platform", false),
      boolChild("IsNumeric", "true if the email address is numeric", false),
      intChild("CountSocialMediaLinks", "Count of Social Media like Github, Twitter, FB etc for the email", false),
      intChild(
        "CountUsers",
        "Count of customer IDs using this email. This count is scoped to your account, not across sardine network.",
        false
      ),
      intChild(
        "CountPhoneNumbers",
        "Count of phone numbers using this email. This count is scoped to your account, not across sardine network.",
        false
      ),
      intChild(
        "CountFirstNames",
        "Count of first names using this email. This count is scoped to your account, not across sardine network.",
        false
      ),
      intChild(
        "CountLastNames",
        "Count of last names using this email. This count is scoped to your account, not across sardine network.",
        false
      ),
      newChild("CountSocialMediaFriends", "20", DATA_TYPES.int, "Social media friends", false),
      boolChild("IsVerified", "Email was Verified by you", false),
      stringChild("EmailAddress", "email address"),
      stringChild("Domain", "domain"),
      boolChild("HasMxRecord", "Whether an MX record was found for the email domain.", false),
      boolChild("IsDisposable", "Is the domain of the email address a disposable domain. ", false),
      boolChild("IsRoleAccount", "Is the email address a role-based account. For example - admin, info, sales.", false),
      boolChild("IsSyntaxValid", "Is this a valid email address.", false),
      boolChild("IsDomainValid", "Is the email domain valid.", false),
      // Live features
      boolChild("HasData", "true if we found email intelligence about given email address", false),
      stringChild("Error", "error string about email intelligence. possible value is ERROR_FROM_PROVIDER"),
      stringChild("FullName", "Name of the user"),
      stringChild("Address", "billing address tied to email"),
      newChild("Score", "50..75", DATA_TYPES.int, "Email score", false),
      intChild("RelevantInfoId", "Id for email relevant information", false),
      newChild("DomainScore", "50..75", DATA_TYPES.int, "Email's domain score", false),
      intChild("DomainRelevantInfoId", "Id for email's domain relevant information", false),
      newChild("RiskBand", "1", DATA_TYPES.int, "Riskiness of email", false),
      stringChild("ReasonCode", "Reason codes related to this email"),
      boolChild("IsBlocklisted", "email address is blocklisted by you", false),
      boolChild("IsBlocklistedByNetwork", "email address is blocklisted by any merchant in sardine network", false),
      new FeatureItem(
        "TransactionCount",
        [new FeatureItem("15MIN"), new FeatureItem("1HR"), new FeatureItem("3HR"), new FeatureItem("24HR")],
        "1",
        DATA_TYPES.int,
        false,
        "Total transaction count associated with the email in the given time window"
      ),
      new FeatureItem(
        "TransactionAmount",
        [new FeatureItem("15MIN"), new FeatureItem("1HR"), new FeatureItem("3HR"), new FeatureItem("24HR")],
        "100.0",
        DATA_TYPES.float,
        false,
        "Total transaction amount associated with the email in the given time window"
      ),
    ]),
    new FeatureItem("Phone", [
      stringChild("PhoneNumber", "PhoneNumber"),
      newChild("RiskLevel", "high", DATA_TYPES.string, "Risk level from phone", false),
      newChild("PhoneType", "NonFixedVoIP", DATA_TYPES.string, "Mobile, Landline, FixedVoIP, NonFixedVoIP, or Other", false),
      newChild("PhoneCarrier", "Verizon", DATA_TYPES.string, "E.g. ATT, Verizon", false),
      newChild("SimTenure", "2020-12-12", DATA_TYPES.string, "How long this SIM card has been used?"),

      // Live features
      boolChild("HasData", "true if we found phone intelligence about given phone number", false),
      stringChild("Error", "error string about phone intelligence. possible values are INVALID_NUMBER and ERROR_FROM_PROVIDER"),
      boolChild("Verified", "Phone was Verified by you", false),
      newChild("TrustScore", "80", DATA_TYPES.int, "Score to trust the given number", false),
      newChild("AddressScore", "70", DATA_TYPES.int, "Score to trust the given address", false),
      newChild("NameScore", "60", DATA_TYPES.int, "Score to trust the given name", false),
      newChild("ReasonCodes", `["PIV"]`, DATA_TYPES.stringarray, "ReasonCodes", false),
      intChild(
        "CountUsers",
        "Count of users associated with this phone number. This count is scoped to your account, not across sardine network.",
        false
      ),
      intChild(
        "CountEmails",
        "Count of emails associated with this phone number. This count is scoped to your account, not across sardine network.",
        false
      ),
      intChild(
        "CountFirstNames",
        "Count of first name associated with this phone number. This count is scoped to your account, not across sardine network.",
        false
      ),
      intChild(
        "CountLastNames",
        "Count of last name associated with this phone number. This count is scoped to your account, not across sardine network.",
        false
      ),
      boolChild("DOBMatch", "DoB provided matched the DoB returned by phone intelligence provider", false),
      boolChild("Last4Match", "Last 4 of Tax-Id matched with Tax-Id returned by phone intelligence provider", false),
      boolChild("SSNMatch", "SSN matched with SSN returned by phone intelligence provider", false),
      boolChild("IsBlocklisted", "phone is blocklisted by you", false),
      boolChild("IsBlocklistedByNetwork", "phone is blocklisted by any merchant in sardine network", false),
      new FeatureItem(
        "TransactionCount",
        [new FeatureItem("15MIN"), new FeatureItem("1HR"), new FeatureItem("3HR"), new FeatureItem("24HR")],
        "1",
        DATA_TYPES.int,
        false,
        "Total transaction count associated with the phone in the given time window"
      ),
      new FeatureItem(
        "TransactionAmount",
        [new FeatureItem("15MIN"), new FeatureItem("1HR"), new FeatureItem("3HR"), new FeatureItem("24HR")],
        "100.0",
        DATA_TYPES.float,
        false,
        "Total transaction amount associated with the phone in the given time window"
      ),
    ]),

    new FeatureItem("Sanction", [
      stringChild(
        "SanctionLevel",
        "Sanction level is based on data from the most relevant organizations such as OFAC, United Nations, European Union etc."
      ),
      stringChild(
        "PepLevel",
        "Politically Exposed Persons (PEP) level define person's identity based on a manually sourced agenda of worldwide elections"
      ),
      stringChild("AdverseMediaLevel", "Adverse media level define person's visibility on fraud/money laundering"),
      newChild("ReasonCodes", `["SDN"]`, DATA_TYPES.stringarray, "ReasonCodes", false),
    ]),

    new FeatureItem("Transaction", [
      newChild("RiskLevel", "high", DATA_TYPES.string, "Risk level of transaction", false),
      newChild("AMLRiskLevel", "high", DATA_TYPES.string, "AML Risk level of transaction", false),
      newChild("Amount", "12.3", DATA_TYPES.float, "Transaction amount from the v1/customers API payload (in USD)", false),
      newChild("CurrencyCode", "USD", DATA_TYPES.string, "currency code", false),
      stringChild("ItemCategory", "item category from the v1/customers API payload"),
      stringChild("ActionType", "Indicates the type of transaction eg., buy, sell, deposit, withdraw, refund, or payment"),
      stringChild("MCC", "merchant category code"),
    ]),

    new FeatureItem("TransactionAggregation", transactionAggregationFeatureItems),

    new FeatureItem("DocumentKYC", [
      stringChild("FirstName", "name extracted from the document"),
      stringChild("MiddleName", "name extracted from the document"),
      stringChild("LastName", "name extracted from the document"),
      stringChild("IssuingCountry", "2-digit country code"),
      stringChild("RiskLevel", "Overall riskiness of accepting this ID document. high, medium, low, or unknown"),
      stringChild("ForgeryLevel", "indicates the likelihood of submitted document is forged. high, medium, low"),
      stringChild("DocumentMatchLevel", "image quality of ID document. high, medium, low"),
      stringChild(
        "ImageQualityLevel",
        "likelihood of inputData match with the document image. high, medium, low, or not_applicable",
        false
      ),
      stringChild(
        "FaceMatchLevel",
        "likelihood of photo/selfie match with the document image. high, medium, low, not_applicable, or error",
        false
      ),
    ]),

    new FeatureItem("PaymentMethod", paymentMethodFeatures),

    new FeatureItem("RecipientPaymentMethod", paymentMethodFeatures),

    // Live modules with features
    new FeatureItem("TaxID", taxIdFeatures),
    new FeatureItem("CustomerSession", [
      newChild("Flow", "onboarding", DATA_TYPES.string, "flow parameter given by you", false),
      newChild("PersonalCountryCode", "US", DATA_TYPES.string, "Country code", false),
      newChild("RiskScore", "80", DATA_TYPES.int, "Session risk score", false),
      newChild("IpCountryCodeMatch", "true", DATA_TYPES.bool, "If IP country matches address country", false),
      newChild("IpCityMatch", "false", DATA_TYPES.bool, "If IP city matches address city", false),
      newChild("IpRegionCodeMatch", "false", DATA_TYPES.bool, "If IP state matches address state", false),
      boolChild("CardCountryToBillingCountryMismatch", "whether the card bin country matches billing address country", false),
      boolChild("CardCountryToIDCountryMismatch", "whether the card bin country matches ID document country", false),
      newChild(
        "IPToCustomerAddressDistance",
        "-1",
        DATA_TYPES.int,
        "Distance between IP Geolocation to customer address in kilometers",
        false
      ),
      newChild(
        "GPSToCustomerAddressDistance",
        "-1",
        DATA_TYPES.int,
        "Distance between  customer GPS location to customer address in kilometers",
        false
      ),
    ]),
    new FeatureItem("Custom", getCustomFeatures(organization)),
    new FeatureItem(FUNCTIONS, [], "", DATA_TYPES.function, false, "Custom functions to support advanced operations"),
    new FeatureItem(
      "OutAmountRatio",
      [
        new FeatureItem("24HRS"),
        new FeatureItem("7DAYS"),
        new FeatureItem("30DAYS"),
        new FeatureItem("60DAYS"),
        new FeatureItem("90DAYS"),
      ],
      "1",
      DATA_TYPES.int,
      false,
      "Total amount of outgoing transactions (money is going out from user's payment method) eg buy, deposit"
    ),
  ];

  if (checkpoint === "all") {
    return [...featuresArray, ...issuingFeatures];
  }

  if (!arrayCustomerCheckpoints.includes(checkpoint.toLowerCase())) {
    return [
      ...filterVisibleFeatures(getDeviceRelatedFeaturesList(checkpoint), isDemoMode, isSuperAdmin),
      new FeatureItem(FUNCTIONS, [], "", DATA_TYPES.function, false, "Custom functions to support advanced operations"),
    ];
  }

  return filterVisibleFeatures(featuresArray, isDemoMode, isSuperAdmin);
};
