import { BankTypeValue } from "../constants";

export interface TransactionKind {
  session_key: string;
  recipient_payment_method?: string;
  currency_code: string;
  client_id: string;
  id?: string;
  account_type?: BankTypeValue;
  created_milli: number;
  customer_id: string;
  action_type: string;
  timestamp?: number;
  mcc: string;
  request_id: string;
  amount: number;
  routing_number?: string;
  account_number?: string;
  payment_method?: string;
  crypto_address?: string;
  item_category: string;
  recipient_payment_method_crypto?: RecipientPaymentMethodCrypto;
  aml_level?: string;
  risk_level?: string;
  crypto_currency_code?: string;
  bin_country?: string;
  type?: string;
  brand?: string;
  card_hash?: string;
  level?: string;
  issuer?: string;
  last_4?: string;
  first_6?: string;
  indemnification_decision?: number;
  indemnification_reason?: string;
  bank_balance?: number;
  bank_total_amount_spent?: number;
  bank_balance_currency?: string;
}

interface RecipientPaymentMethodCrypto {
  crypto_address: string;
  currency_code: string;
}
