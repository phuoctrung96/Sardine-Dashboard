export const ADMIN_PATH = "/admin";
export const DATA_DICTIONARY_PATH = "/data-dictionary";
export const DEVICE_VIEW_PATH = "/device-view";
export const DEVICE_INTELLIGENCE_PATH = "/device-intelligence";
export const TRANSACTIONS_PATH = "/transactions";
export const REGISTER_PATH = "/register";
export const RULES_PATH = "/rules";
export const RULE_DETAILS_PATH = "/rule_details";
export const MANAGE_RULE = "/manage_rule";
export const DATA_DISTRIBUTION_PATH = "/data-distribution";
export const LOGIN_PATH = "/login";
export const NOTIFICATIONS_PATH = "/notifications";
export const FEATURE_FLAGS_PATH = "/flags";
export const QUEUES_PATH = "/queues";
export const ROOT_PATH = "/";
export const SESSIONS_PATH = "/sessions";
export const SUPER_ADMIN_MEMBERS_PATH = "/super-admin-members";
export const DOCUMENT_VERIFICATIONS_PATH = "/document-verifications";
export const DOCUMENT_VERIFICATION_DETAIL_PATH = `${DOCUMENT_VERIFICATIONS_PATH}/:id`;
export const PURCHASE_LIMIT_PATH = "/purchase-limit";
export const TRANSACTION_DETAILS_PATH = "/transaction-details";
export const CUSTOMERS_PATH = "/customers";
export const CUSTOMER_PROFILE_PATH = "/customer-profile";
export const PAYMENT_METHOD_DETAILS_PATH = "/payment-method";
export const SESSION_DETAILS_PATH = "/session-details";
export const SETTINGS_PATH = "/settings";
export const FEEDBACKS_PATH = "/feedbacks";
export const FEEDBACK_DETAILS_PATH = "/feedback_details";

export const SEARCH_PARAM_KEYS = { [RULE_DETAILS_PATH]: { RULE_ID: "ruleID", CLIENT_ID: "client_id", ORG: "org" } } as const;
