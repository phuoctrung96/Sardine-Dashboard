import { DocumentVerification, SessionKind, Transaction } from ".";
import { BankType, CardIssuerBrandType, CardLevelType, CardType } from "../constants";

export interface SessionList {
  sessions: Array<SessionKind>;
  pageCursor: string | undefined;
}

export interface TransactionList {
  transactions: Array<Transaction>;
  pageCursor: string | undefined;
}

export interface SessionWithTransactions {
  session: SessionKind | null;
  transactions: Array<Transaction>;
}

export interface CustomerProfileResponse {
  sessions: Array<SessionKind>;
  transactions: TransactionList;
  documentVerifications: Array<DocumentVerification>;
}

export interface OwnerProps {
  id: string;
  name?: string;
  email: string;
  organisation?: string;
  organisation_id?: string;
}

export interface CryptoDetailsResponse {
  address: string;
  currency_code: string;
  addressRiskScore: string;
  userRiskScore: string;
  categories: string;
}

export interface CardDetailsResponse {
  last4?: string
  first6?: string
  card_type?: CardType
  issuer_bank?: string
  issuer_brand?: CardIssuerBrandType
  is_prepaid?: boolean
  level?: CardLevelType
}

export interface BankDetailsResponse {
  account_type?: BankType;
  balance: number;
  balance_currency: string;
  total_amount_spent?: any;
  routing_number?: any;
  account_number?: any;
  amount?: any;
  currency_code?: any;
  item_category?: any;
  created_at_millis: {
    value: string;
  };
  action_type?: any;
  type: string;
}

export interface AddressFields {
  street1: string;
  street2: string;
  city: string;
  region_code: string;
  postal_code: string;
  country_code: string;
}

export interface CustomersResponse {
  client_id: string;
  session_key: string;
  customer_id: string;
  flow: string;
  first_name: string;
  last_name: string;
  phone: string;
  address_fields_list: AddressFields[];
  email_address: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  device_id: string;
  date_of_birth: string;
  customer_score: string;
  email_reason_codes: string;
  phone_reason_codes: string;
  phone_level: string;
  email_level: string;
  email_domain_level: string;
  risk_level: string;
  created_date: string;
  customer_risk_level: string;
  reason_codes: Array<string>;
  device_risk_level: string;
  browser: string;
  os: string;
  true_os: string;
  device_ip: string;
  ip_city: string;
  ip_region: string;
  ip_country: string;
  remote_desktop: string;
  emulator: string;
  proxy: string;
  ip_type: string;
  vpn: string;
  timestamp: string;

  // Tax ID and sentilink
  abuse_score: number;
  first_party_synthetic_score: number;
  id_theft_score: number;
  name_dob_shared_count: number;
  name_ssn_synthetic_address: boolean;
  ssn_bogus: boolean;
  ssn_history_longer_months: number;
  ssn_issuance_before_dob: boolean;
  ssn_issuance_dob_mismatch: boolean;
  ssn_shared_count: number;
  ssn_names_exact_match: string[];
  ssn_phones_exact_match: string[];
  ssn_emails_exact_match: string[];
  ssn_dobs_exact_match: string[];
  tax_id: string;
  tax_id_name_match: string;
  tax_id_dob_match: string;
  tax_id_state_match: string;
  tax_id_match: string;
  tax_id_level: string;
  third_party_synthetic_score: string;

  transaction_id: string;
  transaction_amount: string;
  transaction_currency_code: string;
  carrier: string;
  phone_country: string;
  name_score: string;
  address_score: string;
  risk_band: string;
  email_reason: string;
  email_owner_name: string;
  email_owner_name_match: string;
  location: string;
  latitude: string;
  longitude: string;
  facebook_Link: string;
  Twitter_Link: string;
  LinkedIn_Link: string;
  phonescore_reason: string;
  email_phone_risk_level: string;
  billaddress_reason: string;
  rules_executed: Array<number>;
  // Additional fields related to case management
  id?: string;
  status?: string;
  owner?: OwnerProps;
  decision?: string;

  // queue ids
  queue_id?: string[];
  datetime?: string;
}
