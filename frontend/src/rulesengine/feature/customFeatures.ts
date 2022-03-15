import { FeatureItem, stringChild, newChild, DATA_TYPES } from "../featureItem";

type MerchantFeatures = {
  merchants: string[];
  features: FeatureItem[];
};

const merchantFeatures = (merchants: string[], features: FeatureItem[]): MerchantFeatures => ({ merchants, features });

export const getCustomFeatures = (organization?: string): FeatureItem[] => {
  const sardine = ["demo.sardine.ai", "demo.dev.sardine.ai"];
  const moonpay = ["dev.moonpay", "trial.moonpay.io"];
  const wert = ["wert"];
  const relayfi = ["dev.relayfi", "relayfi"];
  const giveCrypto = ["trial.givecrypto.org", "dev.givecrypto.org", "givecrypto.org"];
  const vault = ["dev.vault", "vault"];
  const recur = ["recur", "dev.recur"];
  const featureLists: MerchantFeatures[] = [
    merchantFeatures(moonpay, [
      newChild(
        "passwordChangedAt",
        "",
        DATA_TYPES.int,
        "Timestamp (in milliseconds) when password last changed for this user",
        false
      ),
      newChild("sourceLevel", "", DATA_TYPES.string, "riskiness of payment source", false),
      newChild("kyc", "", DATA_TYPES.bool, "whether customer passed KYC or not", false),
    ]),
    merchantFeatures(wert, [
      newChild("kyc_user_level", "", DATA_TYPES.string, "status of KYC", false),
      newChild("order_type", "", DATA_TYPES.string, "simple or SC(NFT)", false),
    ]),
    merchantFeatures(relayfi, [
      newChild("business_entity_formation_date", "", DATA_TYPES.int, "timestamp in millis", false),
      newChild("domain_registered_date", "", DATA_TYPES.int, "timestamp in millis", false),
      newChild(
        "is_bookkeeping_or_acounting",
        "",
        DATA_TYPES.bool,
        "Whether the id is for a book keeping or accounting firm",
        false
      ),
    ]),
    merchantFeatures(giveCrypto, [
      newChild("cohortScores", "", DATA_TYPES.stringarray, "", false),
      newChild("phoneCarrier", "", DATA_TYPES.string, "", false),
      newChild("phoneCarrierType", "", DATA_TYPES.string, "", false),
    ]),
    merchantFeatures(vault, [
      stringChild("Trulioo_businessName", ""),
      stringChild("Trulioo_businessRegistrationNumber", ""),
      stringChild("Trulioo_jurisdictionOfIncorporation", ""),
      stringChild("Trulioo_address1", ""),
      stringChild("Trulioo_city", ""),
      stringChild("Trulioo_stateProvinceCode", ""),
      stringChild("Trulioo_postalCode", ""),
      stringChild("Trulioo_GOVERNMENT_REGISTRY_BusinessRegistrationNumber", ""),
      stringChild("Trulioo_INTERNATIONAL_WATCHLIST_BusinessName", ""),
      stringChild("Trulioo_DOCUMENT_VERIFICATION_Result", ""),
      stringChild("Trulioo_GOVERNMENT_REGISTRY_BusinessStatus", ""),
      stringChild("Trulioo_KYB_Result", ""),
    ]),
    merchantFeatures(
      recur,
      [
        "jumioVerificationStatus",
        "jumioIdScanStatus",
        "jumioIdScanSource",
        "jumioIdCheckDataPositions",
        "jumioIdCheckDocumentValidation",
        "jumioIdCheckHologram",
        "jumioIdCheckMRZcode",
        "jumioIdCheckMicroprint",
        "jumioIdCheckSecurityFeatures",
        "jumioIdCheckSignature",
        "jumioIdSubtype",
        "jumioIdExpiry",
        "jumioGender",
        "jumioPresetCountry",
        "jumioPresetIdType",
        "jumioNationality",
        "jumioPassportNumber",
        "jumioOriginDob",
        "jumioIssuingAuthority",
        "jumioIssuingDate",
        "jumioIssuingPlace",
        "jumioPlaceOfBirth",
        "jumioTaxNumber",
        "jumioPersonalIdentificationNumber",
      ].map((s) => stringChild(s, ""))
    ),
  ];
  const org = (organization || "").toLowerCase();
  const features: FeatureItem[] = featureLists.find((f) => f.merchants.includes(org) || sardine.includes(org))?.features || [];

  return features.length === 0
    ? [
        newChild(
          "ToBeImplemented",
          "n",
          DATA_TYPES.string,
          "Please contact sardine to use custom feature value in rule engine",
          false
        ),
      ]
    : features;
};
