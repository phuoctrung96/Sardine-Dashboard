import { boolChild, newChild, DATA_TYPES, stringChild } from "../featureItem";
// Live modules with features
export const taxIdFeatures = [
  boolChild("HasData", "true if we found taxID intelligence about given taxID"),
  newChild("AbuseScore", "80", DATA_TYPES.int, "Abuse score of the ID", false),
  newChild("RiskLevel", "high", DATA_TYPES.string, "Risk level from tax Id", false),
  newChild("FirstPartySyntheticScore", "80", DATA_TYPES.int, "Score from their true name and date of birth, but an TaxID", false),
  newChild(
    "ThirdPartySyntheticScore",
    "80",
    DATA_TYPES.int,
    "Score applicants using a name, date of birth and TaxID combination that is completely fabricated",
    false
  ),
  newChild("IDTheftScore", "700", DATA_TYPES.int, "Score indicating if applicant is using another consumer's identity.", false),
  newChild(
    "NameMatch",
    "exact",
    DATA_TYPES.string,
    "If user-provided name matches with what is registered with TaxID. Possible values are 'exact', 'fuzzy' and 'nomatch'",
    false
  ),
  newChild(
    "DobMatch",
    "exact",
    DATA_TYPES.string,
    "If user-provided date of birth matches with what is registered with TaxID. Possible values are 'exact', 'fuzzy' and 'nomatch'",
    false
  ),
  newChild(
    "StateMatch",
    "exact",
    DATA_TYPES.string,
    "If user-provided residental state matches with what is registered with TaxID. Possible values are 'exact', 'fuzzy' and 'nomatch'",
    false
  ),
  newChild(
    "TaxIDMatch",
    "exact",
    DATA_TYPES.string,
    "If user-provided taxID msatches with kwnon record that most closely matches with name, dob and state",
    false
  ),
  newChild("SsnSharedCount", "3", DATA_TYPES.int, "The number of identities that share the same SSN.", false),
  newChild("NameDobSharedCount", "2", DATA_TYPES.int, "Number of identities that share the same Name and Date of Birth.", false),
  newChild(
    "SsnIssuanceDobMismatch",
    "false",
    DATA_TYPES.bool,
    " Whether the SSN was issued significantly later than usual for the Date of Birth.",
    false
  ),
  newChild("SsnIssuedBeforeDob", "true", DATA_TYPES.bool, " Whether the Date of Birth occurred after the SSN was issued.", false),
  newChild(
    "NameSsnSyntheticAddress",
    "true",
    DATA_TYPES.bool,
    " Whether the identity has been tied to bad addresses in the past.",
    false
  ),
  newChild(
    "SsnHistoryLongerMonths",
    "100",
    DATA_TYPES.int,
    "If another identity has a longer history with this SSN, the difference in months.",
    false
  ),
  newChild("SsnBogus", "true", DATA_TYPES.bool, "Whether the SSN is invalid.", false),
  stringChild("Error", "error string about taxID intelligence reterival. possible value is ERROR_FROM_PROVIDER"),
  newChild("ReasonCodes", `["SSF", "AHM"]`, DATA_TYPES.stringarray, "ReasonCodes", false),
];
