export const MOCK_PERSONAL_INFORMATION = {
  emailAddress: "alexthief@darkside.com",
  isEmailVerified: true,
  phone: "+1235467724794",
  dateOfBirth: "12-07-1972",
  timestamp: "2022-01-18",
  phoneCountry: "US",
  isPhoneVerified: false,
  facebook: "/alexthief12",
  linkedIn: "-",
  twitter: "@alexthethief",
};

export const MOCK_ADDRESS = [
  {
    address: "13 chestnut close , Waterford , X91, IE",
    city: "San Francisco",
    postalCode: "94117",
    regionCode: "SF",
    countryCode: "US",
  },
  {
    address: "98067 Main Avenue",
    city: "Berkeley",
    postalCode: "94710",
    regionCode: "CA",
    countryCode: "US",
  },
];

export const MOCK_DEVICE_DETAILS = {
  browser: "Chrome",
  createdAt: "2022-01-11 at 09:42:40",
  deviceId: "6f49a5ec-5b23-474c-b096-63b6ee3d73c3",
  reputation: "Unknown",
  emulator: false,
  fingerprintId: "7bdac7e3-c1ab-49af-88b1-030870bf4498",
  confidenceScore: "0.689655",
  remoteSoftware: true,
  screenResolution: "900x1440",
  deviceModel: "-",
  behaviorBiometricLevel: "Low",
  deviceAgeHours: 102,
};

export const MOCK_NETWORK_DETAILS = {
  ipAddress: "180.35.216.46",
  ipType: "2022-01-11 Fixed Line ISPat 09:42:40",
  vpn: "low",
  proxy: "low",
  city: "Tokyo",
  region: "Greater Tokyo",
  country: "US",
  location: "139.69,35.69",
};

export const MOCK_OS = {
  os: "Mac OS X",
  trueOS: "Mac OS X",
  osAnomally: "low",
};

export const MOCK_BEHAVIOR_BIOMETRICS = [
  {
    num_distraction_events: 0,
    num_context_switches: 26,
    hesitation_percentile: {
      ltm: 0,
      non_ltm: 0,
    },
    fields: [
      {
        name: "town",
        is_ltm: true,
        num_auto_fill_events: 0,
        hesitation_percentage: 0,
        num_expert_key_events: 0,
        num_clipboard_events: 0,
        num_copy_paste_events: 0,
      },
      {
        name: "street2",
        num_copy_paste_events: 0,
        num_expert_key_events: 0,
        hesitation_percentage: 0,
        num_clipboard_events: 0,
        is_ltm: true,
        num_auto_fill_events: 0,
      },
    ],
    flow: "automated_test",
    updated_at: 1646029162,
    created_at: 1646029160,
    hesitations_percentage: {
      amount: 0,
      ltm: 0,
    },
    num_context_switch_events: 26,
  },
];

export const MOCK_CARD_DETAILS = [
  {
    type: "Credit Card",
    number: "1234-4567-8710-9871",
    issues: "Unknown",
    isPrepaid: false,
    category: "USD",
  },
];

export const MOCK_BANK_DETAIL = [
  {
    accountNumber: "1234567",
    routingNumber: "021000021",
    accountType: "Unknown",
    balance: "2.684 USD",
    totalSpent: "- USD",
  },
];

export const MOCK_TRANSACTIONS = [
  {
    id: 1,
    amount: "USD 1.578",
    paymentMode: "Bank transfer",
    itemCategory: "USD",
    date: "December 31, 1969 - 9:00 PM",
    actionType: "Buy",
  },
];

export const MOCK_CRYPTO_ADDRESSES = [
  {
    currencyCode: "ETH - Ethereum",
    address: "15e15hWo6CShMgbAfo8c2Ykj4C6BLq6Not",
    addressRiskLevel: "high",
    userRiskLevel: "very_high",
    addressCategories: "0.568421",
    coinbaseDashboard: "View",
  },
];
