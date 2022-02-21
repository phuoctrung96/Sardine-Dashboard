import { FeatureItem, DATA_TYPES, newChild, boolChild, floatChild, intChild, stringChild } from "../featureItem";

const bankAccountAddress = [
  stringChild("Street", "street address associated with the bank account"),
  stringChild("City", "bank account address city"),
  stringChild("Region", "bank account state"),
  stringChild("PostalCode", "bank account postal code"),
  stringChild("Country", "bank account country"),
  boolChild("StreetMismatch", "mismatch between bank account street address and customer provided street address", false),
  boolChild("CityMismatch", "mismatch between bank account address city and customer provided address city", false),
  boolChild("RegionMismatch", "mismatch between bank account state and customer provided state", false),
  boolChild("PostalCodeMismatch", "mismatch between bank account postal code and customer provided postal code", false),
  boolChild("CountryMismatch", "mismatch between bank account country and customer provided country", false),
];

const accountIdentity = [
  stringChild("Email", "bank account email"),
  boolChild("EmailMismatch", "bank email mismatches customer provided email"),
  stringChild("Phone", "bank account phone number"),
  boolChild("PhoneMismatch", "bank phone number mismatches customer provided phone."),
  stringChild("PhoneType", "bank account phone number"),
  stringChild("FirstName", "first name associated with the bank account"),
  stringChild("LastName", "last name associated with the bank account"),
  boolChild("FirstNameMismatch", "first name associated with bank account does not match customer first name", false),
  boolChild("LastNameMismatch", "last name associated with bank account does not match customer last name", false),
  intChild("NumOwnerNames", "number of owner names associated with the bank account", false),
  new FeatureItem("Address", bankAccountAddress),
];

export const paymentMethodFeatures = [
  new FeatureItem("Bank", [
    new FeatureItem(
      "PercentageMoneyOut",
      [new FeatureItem("1DAY"), new FeatureItem("1MTH")],
      "75",
      DATA_TYPES.int,
      true,
      "Percentage of money moved relative to your initial balance"
    ),
    new FeatureItem(
      "NewCardPercentageMoneyOut",
      [new FeatureItem("1DAY"), new FeatureItem("1MTH")],
      "75",
      DATA_TYPES.int,
      true,
      "NewCard is any card opened within last 1 week. It can be multiple cards also. e.g. if balance is $100 and $25 was moved to new card 1 and $25 to new card 2 then this field will have value 50(%)"
    ),
    new FeatureItem(
      "NewDevicePercentageMoneyOut",
      [new FeatureItem("1DAY"), new FeatureItem("1MTH")],
      "75",
      DATA_TYPES.int,
      true,
      "Here the new Device is any device added within last 30 days"
    ),
    newChild("AccountNumber", "021000021", DATA_TYPES.string, "Account Number"),
    newChild("RoutingNumber", "122105155", DATA_TYPES.string, "Routing Number"),
    new FeatureItem("PrimaryIdentity", accountIdentity, "", "", false, "Primary Bank Account Identity"),
    new FeatureItem("SecondaryIdentity", accountIdentity, "", "", false, "Secondary Bank Account Identity"),
    floatChild("CurrentBalance", "current balance of the bank account", false),
    floatChild("AvailableBalance", "available balance of the bank account", false),
    intChild("BalanceLastUpdated", "Unix time for when balance was last updated", false),
    intChild("DaysSinceBalanceLastUpdated", "number of days since balance was last updated", false),
    // NSF Related Features
    intChild("NSFCount", "previous NSF count", false),
    floatChild("NSFTotalAmount", "total NSF transaction amount", false),
    floatChild("NSFAvgAmount", "average NSF transaction amount", false),
    intChild("NSFLastDate", "Unix time for when the last NSF occurred", false),
    floatChild("NSFLastAmount", "previous NSF transaction amount", false),
    // Overdraft Related Features
    intChild("OverdraftCount", "previous overdraft count from this account", false),
    floatChild("OverdraftTotalAmount", "total overdraft amount", false),
    floatChild("OverdraftAvgAmount", "average overdraft transaction amount", false),
    intChild("OverdraftLastDate", "Unix time for when the last overdraft occurred", false),
    floatChild("OverdraftLastAmount", "previous overdraft transaction amount", false),
    floatChild("TransactionAmountAsBalanceFraction", "transaction amount as a fraction of the bank balance", false),
    newChild("RiskLevel", "high", DATA_TYPES.string, "Bank risk level"),
    newChild("FirstSeenAt", "1617137009018", DATA_TYPES.string, "Date in unix timestamp when the bank account was first seen."),

    // Live features
    stringChild("FullName", "Name of the user"),
    stringChild("Address", "Address of the user"),
    stringChild("PhoneNumber", "Phone number of the user"),
    newChild("AccountResponseCode", "[9, 11]", DATA_TYPES.stringarray, "Response codes for an account", false),
    intChild("AccountsLinked", "Is acccount linked to given user", false),
    newChild("MicrobiltCode", "50..75", DATA_TYPES.string, "Response code from microbilt", false),
    newChild("MicrobiltStr", '"W"', DATA_TYPES.string, "Response string from microbilt", false),
    intChild("CountTransactions", "Count of transactions", false),
    new FeatureItem(
      "OutAmount",
      [new FeatureItem("ALL"), new FeatureItem("24HRS")],
      "1",
      DATA_TYPES.int,
      false,
      "Sum of total money spent (in USD)"
    ),
    intChild("Balance", "Balance of the account", false),
    stringChild("CurrencyCode", "currencyCode"),
  ]),
  new FeatureItem("Card", [
    stringChild("First6", "first 6 digits of card. also known as BIN (Bank Identification Number)"),
    stringChild("Last4", "last 4 digits of card"),
    stringChild("Hash", "hash of card number as passed in API"),
    stringChild("Brand", "card brand. eg VISA or MASTERCARD"),
    stringChild("Issuer", "name of card issuer. eg CITIBANK"),
    stringChild(
      "Level",
      "Level of the card. Some common values are - Some common examples are - PREPAID,BUSINESS, PREMIUM, PLATINUM"
    ),
    stringChild("Type", "Type of card - credit or debit"),
    stringChild("Country", "card issuer country"),
    stringChild("Zip", "card issuer zip code"),
    stringChild("City", "card issuer city"),
    newChild("FirstSeenAt", "1617137009018", DATA_TYPES.string, "Date in unix timestamp when the card was first seen."),
    intChild("CountTransactions", "Count of transactions", false),
    intChild("TotalAmountSpent", "Sum of total money spent (in USD)", false),
    intChild("CountUsers", "Count of users associated with this card", false),
    intChild("CountTransactionsLastFiveMin", "count of transactions in last 5 mins", false),
    intChild("CountTransactionsLastHalfHour", "count of transactions in last half hour", false),
    intChild("CountTransactionsLastOneDay", "count of transactions in the last 1 day", false),
    intChild("CountTransactionsLastWeek", "count of transactions in the last week", false),
  ]),
  new FeatureItem("Crypto", [
    newChild("AddressRiskLevel", "high", DATA_TYPES.string, "AddressRiskLevel coinbase address risk level ratings", false),
    newChild("UserRiskLevel", "high", DATA_TYPES.string, "UserRiskLevel coinbase user risk level ratings", false),
    newChild("Address", "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", DATA_TYPES.string, "Recipient address", false),
    newChild("Asset", "BTC", DATA_TYPES.string, "Asset eg. BTC", false),
    intChild("UsersUsingCryptoAddressCount", "UsersUsingCryptoAddressCount number of users using the crypto address", false),
    newChild("ReasonCodes", `["address category"]`, DATA_TYPES.stringarray, "ReasonCodes  eg. address category", false),
    boolChild("IsBlocklisted", "crypto address is blocklisted by you", false),
    boolChild("IsBlocklistedByNetwork", "crypto address is blocklisted by any merchant in sardine network", false),
  ]),

  stringChild("Type", "Type of payment method"),
];
