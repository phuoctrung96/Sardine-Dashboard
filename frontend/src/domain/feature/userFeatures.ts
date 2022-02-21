import { FeatureItem, newChild, stringChild, intChild, DATA_TYPES, boolChild } from "../featureItem";

export const userFeatures = [
  newChild("Id", "c4ca4238a0b923820dcc509a6f75849b", DATA_TYPES.string, "Id of the user", false),
  stringChild("FirstName", "name provided by user"),
  stringChild("MiddleName", "name provided by user"),
  stringChild("LastName", "name provided by user"),
  intChild("AccountAge", "Age of account in milliseconds", false),
  intChild("AccountAgeInDays", "Age of the account in days", false),
  intChild("Age", "Age of user in years.", false),
  intChild("RiskScore", "Riskiness score of this user session, between 0 to 99", false),
  newChild("PostalCode", "94016", DATA_TYPES.string, "Postal code of the user", false),
  newChild("Region", "CA", DATA_TYPES.string, "Region of the user", false),
  newChild("Country", "US", DATA_TYPES.string, "Country of the user", false),
  intChild("CountDevices", "Count of devices associated with the user", false),
  intChild(
    "CountLinkedUsers",
    "If the device is used by 1 user and the user used two other devices, then count any OTHER users associated those two devices",
    false
  ),
  intChild("CountIPs", "Count of Any IP addresses associated with the user", false),
  intChild("CountStaticIPs", "Count of Home (eg Comcast)/ Static IP associated with the user", false),
  intChild("CountOSs", "Count different OS this user was accessing from", false),
  intChild("CountReferrers", "Count different referrers this user was accessing from", false),
  intChild("CountProxySessions", "Number of session where proxy marked as true", false),
  intChild("CountVpnSessions", "Number of session where vpn marked as true", false),
  intChild("CountOfSessions", "Number of total sessions"),
  newChild("FraudScore", "80", DATA_TYPES.int, "FraudScore of the customer from all data sources"),

  newChild(
    "FirstTransactionAt",
    "1617137009018",
    DATA_TYPES.int,
    "Date in unix timestamp when the user made first transaction.",
    false
  ),
  newChild(
    "LastTransactionAt",
    "1617137009018",
    DATA_TYPES.int,
    "Date in unix timestamp when the user made last transaction.",
    false
  ),

  intChild("CountCountries", "Number of distinct country"),

  intChild("CountPaymentMethods", "Count of payment methods associated to the user", false),
  intChild("CountCards", "Count of cards associated to the user", false),
  new FeatureItem("CountCardsAdded", [new FeatureItem("7DAYS")], "1", DATA_TYPES.int, false, "Count of cards added to the user"),
  new FeatureItem(
    "InAmount",
    [
      new FeatureItem("ALL"),
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
  new FeatureItem(
    "AchWithdrawAmount",
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
    "Total amount of ACH withdrawal"
  ),
  new FeatureItem(
    "WireWithdrawAmount",
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
    "Total amount of wire withdrawal"
  ),
  new FeatureItem(
    "AchDepositAmount",
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
    "Total amount of ACH Deposit"
  ),
  new FeatureItem(
    "WireDepositAmount",
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
    "Total amount of wire deposit"
  ),
  new FeatureItem(
    "CryptoDepositAmount",
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
    "Total amount of crypto deposit"
  ),
  new FeatureItem(
    "CryptoWithdrawAmount",
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
    "Total amount of crypto withdrawal"
  ),
  newChild(
    "AverageTimeInOut",
    "80",
    DATA_TYPES.float,
    "Average time for Crypto or Money to move in like deposit and move out like withdrawal or Sale"
  ),
  new FeatureItem(
    "InCount",
    [
      new FeatureItem("ALL"),
      new FeatureItem("24HRS"),
      new FeatureItem("7DAYS"),
      new FeatureItem("30DAYS"),
      new FeatureItem("60DAYS"),
      new FeatureItem("90DAYS"),
    ],
    "1",
    DATA_TYPES.int,
    false,
    "Number of incoming transactions"
  ),
  new FeatureItem(
    "OutCount",
    [
      new FeatureItem("ALL"),
      new FeatureItem("24HRS"),
      new FeatureItem("7DAYS"),
      new FeatureItem("30DAYS"),
      new FeatureItem("60DAYS"),
      new FeatureItem("90DAYS"),
    ],
    "1",
    DATA_TYPES.int,
    false,
    "Number of outgoing transactions (money is going out from user's payment method eg buy and deposit)"
  ),

  boolChild("IsBlocklisted", "User ID is blocklisted", false),
  boolChild("IsFraudulent", "True if fraud feedback is sent (Card Not Present or ACH) via our /feedbacks AP", false),
  intChild("CountCryptoAddresses", "Count of all crypto addresses user has deposited from or withdrawn to"),
  intChild("CountRiskyCryptoAddresses", "Count of risky crypto addresses that user has deposited from or withdrawn to", false),
  boolChild("IsSSNCompleted", "Has the SSN been completed as part of the identity completion.", false),
  boolChild("IsDOBCompleted", "Has the Date of Birth been completed as part of the identity completion", false),
  stringChild("SSNCompletedConfidenceLevel", "the level of confidence in the SSN that was found"),
  stringChild("DOBCompletedConfidenceLevel", "the level of confidence in the date of birth that was found"),

  new FeatureItem("Onboarding", [
    stringChild("FullName", "Name of the user"),
    stringChild("Address", "Address of the user"),
    stringChild("City", "City of the user"),
    stringChild("Region", "Region of the user"),
    stringChild("Country", "Country of the user used in onboarding"),
    stringChild("PhoneNumber", "Phone number of the user"),
    newChild("PostalCode", "94016", DATA_TYPES.string, "Postal code of the user", false),
  ]),
  new FeatureItem("IDVerification", [
    stringChild("FullName", "Name of the user"),
    stringChild("Address", "Address of the user"),
    stringChild("PhoneNumber", "Phone number of the user"),
  ]),
  new FeatureItem("TimeSinceFirstSeen", [
    newChild("DeviceId", "1000000", DATA_TYPES.int, "Milliseconds since user was first seen with device ID.", false),
    newChild("DeviceIp", "1000000", DATA_TYPES.int, "Milliseconds since user was first seen with IP address.", false),
    newChild("Fingerprint", "1000000", DATA_TYPES.int, "Milliseconds since user was first seen with fingerprint.", false),
    newChild(
      "AccountDeviceId",
      "1000000",
      DATA_TYPES.int,
      "Milliseconds since user was first seen with account device ID.",
      false
    ),
    newChild("Os", "1000000", DATA_TYPES.int, "Milliseconds since user was first seen with operating system family.", false),
    newChild("Browser", "1000000", DATA_TYPES.int, "Milliseconds since user was first seen with this browser.", false),
    newChild("OnWeb", "1000000", DATA_TYPES.int, "Milliseconds since user was first seen on web (non-mobile app).", false),
    newChild("Language", "1000000", DATA_TYPES.int, "Milliseconds since user was first seen with language (e.g. en-US).", false),
    newChild(
      "LanguageWithoutLocale",
      "1000000",
      DATA_TYPES.int,
      "Milliseconds since user was first seen with language (e.g. en).",
      false
    ),
    newChild(
      "RussianLanguage",
      "1000000",
      DATA_TYPES.int,
      "Milliseconds since user was first seen with Russian language.",
      false
    ),
    newChild(
      "IndonesianLanguage",
      "1000000",
      DATA_TYPES.int,
      "Milliseconds since user was first seen with Indonesian language.",
      false
    ),
    newChild(
      "NigerianLanguage",
      "1000000",
      DATA_TYPES.int,
      "Milliseconds since user was first seen with en-NG (Nigerian English)language.",
      false
    ),
  ]),
];
