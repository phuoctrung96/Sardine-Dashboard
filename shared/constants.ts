export const BANK_ACCOUNT_TYPE = {
  0: "UNKNOWN",
  1: "CHECKING",
  2: "SAVING",
  3: "OTHER",
} as const;

export type BankType = typeof BANK_ACCOUNT_TYPE[keyof typeof BANK_ACCOUNT_TYPE];
export type BankTypeValue = keyof typeof BANK_ACCOUNT_TYPE;

export const CARD_ISSUER_BRAND = {
  Amex: "AMEX",
  ChinaUnionPay: "CHINA UNIONPAY",
  DinersClub: "DINERS CLUB",
  Discover: "DISCOVER",
  Ebt: "EBT",
  EloCard: "ELOCARD",
  Jcb: "JCB",
  Laser: "LASER",
  LocalCard: "LOCAL CARD",
  Maestro: "MAESTRO",
  HIPER: "HIPER",
  Mastercard: "MASTERCARD",
  Troy: "TROY",
  RuPay: "RUPAY",
  Visa: "VISA",
} as const;

export type CardIssuerBrandType = typeof CARD_ISSUER_BRAND[keyof typeof CARD_ISSUER_BRAND];

export const CARD_LEVEL = {
  Blue: "BLUE",
  Business: "BUSINESS",
  Classic: "CLASSIC",
  Corporate: "CORPORATE",
  Electron: "ELECTRON",
  Electronic: "ELECTRONIC",
  ExecutiveBusiness: "EXECUTIVE BUSINESS",
  Fleet: "FLEET",
  Gift: "GIFT",
  Gold: "GOLD",
  Green: "GREEN",
  Infinite: "INFINITE",
  Personal: "PERSONAL",
  Platinum: "PLATINUM",
  Premium: "PREMIUM",
  PremiumPlus: "PREMIUM PLUS",
  Prepaid: "PREPAID",
  Purchasing: "PURCHASING",
  Rewards: "REWARDS",
  Sears: "SEARS",
  Signature: "SIGNATURE",
  Standard: "STANDARD",
  Titanum: "TITANUM",
  VPay: "V PAY",
  World: "WORLD",
  WorldElite: "WORLD ELITE",
  WorldStandard: "WORLD/STANDARD",
} as const;

export type CardLevelType = typeof CARD_LEVEL[keyof typeof CARD_LEVEL];

export const CARD_TYPE = {
  Credit: "CREDIT",
  Debit: "DEBIT",
} as const;

export type CardType = typeof CARD_TYPE[keyof typeof CARD_TYPE];
