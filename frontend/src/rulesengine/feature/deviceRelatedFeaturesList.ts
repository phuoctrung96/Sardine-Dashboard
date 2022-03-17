import { getDeviceFeatures } from "./deviceFeatures";
import { FeatureItem, intChild, newChild, boolChild, DATA_TYPES } from "../featureItem";
import { getSessionFeatures } from "./sessionFeatures";
import { deviceUserFeatures } from "./userFeatures";

export const getDeviceRelatedFeaturesList = (checkpoint: string): FeatureItem[] => [
  new FeatureItem("Device", getDeviceFeatures(checkpoint)),
  new FeatureItem("Session", getSessionFeatures(checkpoint)),
  new FeatureItem("User", deviceUserFeatures),
  new FeatureItem("Biometric", [
    intChild("LTMAutoFill", "Autofill data from user's interaction with form(s)", false),
    intChild("LTMExpertKey", "", false),
    intChild("LTMCopyPaste", "Copy Paste data from user's interaction with form(s)", false),
    intChild("HesitationPercentageLTM", "Number of hesitation while filling the form(s)", false),
    intChild("NumDistractionEvents", "Number of distractions while filling the form(s)", false),
  ]),
  new FeatureItem("IP", [
    newChild("V4Address", "192.0.2.1", DATA_TYPES.string, "IPV4 address"),
    newChild("V6Address", "18:36:F3:98:4F:9A", DATA_TYPES.string, "IPV6 address"),
    boolChild("Proxy", "If IP address is known to be Proxy"),
    boolChild("Vpn", "If IP address is known to be VPN"),
    newChild("Type", "Fixed Line ISP", DATA_TYPES.string, "Type of IP like Corporate, Fixed Line ISP", false),
    newChild("City", "SF", DATA_TYPES.string, "City from IP Address", false),
    newChild("Region", "CA", DATA_TYPES.string, "Region from IP Address", false),
    newChild("Country", "US", DATA_TYPES.string, "2 digit Country Code from IP Address", false),
    newChild("UsageType", "COM", DATA_TYPES.string, "UsageType from IP2Location i.e. COM, ORG, GOV, EDU etc", false),
  ]),
  new FeatureItem("GPS", [
    newChild("City", "San Francisco", DATA_TYPES.string, "City from GPS co-ordinates", false),
    newChild("Region", "CA", DATA_TYPES.string, "Region from GPS co-ordinates", false),
    newChild("Country", "US", DATA_TYPES.string, "2 digit Country Code from GPS co-ordinates", false),
    newChild("MockLevel", "low", DATA_TYPES.string, "Likelihood of GPS coordinate being mocked - low, medium or high", false),
  ]),
];
