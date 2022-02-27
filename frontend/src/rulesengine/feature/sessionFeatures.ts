import { arrayCustomerCheckpoints, FeatureItem, intChild, newChild, boolChild, stringChild, DATA_TYPES } from "../featureItem";

const hide = (i: FeatureItem): FeatureItem => ({ ...i, isHidden: true });

export const getSessionFeatures = (checkpoint: string): FeatureItem[] =>
  [
    newChild("SessionKey", "", DATA_TYPES.string, "Session key", false),
    newChild("RiskLevel", "high", DATA_TYPES.string, "Risk level for the session", false),
    newChild("AMLRiskLevel", "high", DATA_TYPES.string, "AML risk level for the session", false),
    newChild("OS", "iOS", DATA_TYPES.string, "user-reported OS for the session", false),
    newChild("OSAnomaly", "high", DATA_TYPES.string, "Is  there an anomaly between TrueOS and OS?", false),
    newChild("Proxy", "high", DATA_TYPES.string, "Proxy level for the session. Expected values: high, medium, low", false),
    newChild(
      "DistanceIPGps",
      "20",
      DATA_TYPES.float,
      "Distance in miles between IP address  and GPS address city (only available if you use mobile SDKs and user grants GPS permission)"
    ),
    newChild("DeviceScore", "80", DATA_TYPES.int, "Session level device-riskiness Score (1 to 100)"),
    newChild("SessionKey", "03bbe826-4201-438f-ac25-916ccb7f0952", DATA_TYPES.string, "SessionKey"),
    boolChild("IsChecksumInvalid", "client side event data had an invalid checksum, indicating payload was tampered", false),
    intChild("IPCount", "number of IP addresses tied to this session", false),
    intChild("IPCountryCount", "number of country (inferred from IP address) tied to this session", false),
    stringChild("AppPackageName", "package name of mobile app (blank for web)"),
    intChild("TimezoneOffset", "Offset in number of hours between"),
    boolChild("IsRemoteDesktop", "Status of remote desktop active or not. Like TeamViwer, Anydesk, Zoom etc", false),
    stringChild("OriginatingPartnerID", "the partner id that the user originated from"),

    // these features are already available in backend but let's not expose to customers
    hide(boolChild("LiedLanguages", "", false)),
    hide(boolChild("LiedResolution", "", false)),
    hide(boolChild("LiedOS", "", false)),
    hide(boolChild("LiedBrowser", "", false)),
  ].concat(
    arrayCustomerCheckpoints.includes(checkpoint.toLowerCase())
      ? [
          newChild("CustomerScore", "90", DATA_TYPES.int, "Session Level Customer Score (1 to 100)"),
          newChild("DistanceBssidIP", "25", DATA_TYPES.float, "Distance between BSSID and IP"),
        ]
      : []
  );
