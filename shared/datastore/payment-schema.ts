import { BankTypeValue, CardIssuerBrandType, CardLevelType, CardType } from "../constants";

export interface BankKind {
  routing_number: string;
  account_number: string;
  client_id: string;
  account_type: BankTypeValue;
  customer_id: string;
}

export interface CryptoKind {
  payment_type?: string
  crypto_address: string
  customer_id: string
  currency_code: string
  client_id: string
  user_risk_level: string
  address_risk_level: string
  categories: string[]
}

export interface CardKind {
  bin_country?: string
  customer_id: string
  client_id: string
  level?: CardLevelType
  issuer?: string
  last_4: string
  card_hash: string
  brand?: CardIssuerBrandType
  first_6: string
  type?: CardType
  bin_city?: string
  bin_zip?: string
  last_8?: string
}

export interface WireKind {
  customer_id: string;
  routing_number: string;
  client_id: string;
  account_type: number;
  account_number: string;
}