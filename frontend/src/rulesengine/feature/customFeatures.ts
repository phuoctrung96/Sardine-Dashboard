import { FeatureItem, stringChild, newChild, DATA_TYPES } from "../featureItem";

export const getCustomFeatures = (organization?: string): FeatureItem[] => {
  const sardine = ["demo.sardine.ai", "demo.dev.sardine.ai"];
  const moonpay = ["dev.moonpay", "trial.moonpay.io"];
  const wert = ["wert"];
  const relayfi = ["dev.relayfi", "relayfi"];
  const giveCrypto = ["trial.givecrypto.org", "dev.givecrypto.org", "givecrypto.org"];
  const vault = ["dev.vault", "vault"];
  const featureLists = [
    {
      feature: newChild(
        "passwordChangedAt",
        "",
        DATA_TYPES.int,
        "Timestamp (in milliseconds) when password last changed for this user",
        false
      ),
      organization: moonpay,
    },
    {
      feature: newChild("sourceLevel", "", DATA_TYPES.string, "riskiness of payment source", false),
      organization: moonpay,
    },
    {
      feature: newChild("kyc", "", DATA_TYPES.bool, "whether customer passed KYC or not", false),
      organization: moonpay,
    },
    {
      feature: newChild("kyc_user_level", "", DATA_TYPES.string, "status of KYC", false),
      organization: wert,
    },
    {
      feature: newChild("order_type", "", DATA_TYPES.string, "simple or SC(NFT)", false),
      organization: wert,
    },
    {
      feature: newChild("business_entity_formation_date", "", DATA_TYPES.int, "timestamp in millis", false),
      organization: relayfi,
    },
    {
      feature: newChild("domain_registered_date", "", DATA_TYPES.int, "timestamp in millis", false),
      organization: relayfi,
    },
    {
      feature: newChild(
        "is_bookkeeping_or_acounting",
        "",
        DATA_TYPES.bool,
        "Whether the id is for a book keeping or accounting firm",
        false
      ),
      organization: ["relayfi", "dev.relayfi"],
    },
    {
      feature: newChild("cohortScores", "", DATA_TYPES.stringarray, "", false),
      organization: giveCrypto,
    },
    {
      feature: newChild("phoneCarrier", "", DATA_TYPES.string, "", false),
      organization: giveCrypto,
    },
    {
      feature: newChild("phoneCarrierType", "", DATA_TYPES.string, "", false),
      organization: giveCrypto,
    },
    {
      feature: stringChild("Trulioo_businessName", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_businessRegistrationNumber", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_jurisdictionOfIncorporation", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_address1", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_city", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_stateProvinceCode", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_postalCode", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_GOVERNMENT_REGISTRY_BusinessRegistrationNumber", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_INTERNATIONAL_WATCHLIST_BusinessName", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_DOCUMENT_VERIFICATION_Result", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_GOVERNMENT_REGISTRY_BusinessStatus", ""),
      organization: vault,
    },
    {
      feature: stringChild("Trulioo_KYB_Result", ""),
      organization: vault,
    },
  ];
  const org = (organization || "").toLowerCase();
  const features: FeatureItem[] = featureLists
    .filter((f) => f.organization.includes(org) || sardine.includes(org))
    .map((f) => f.feature);

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
