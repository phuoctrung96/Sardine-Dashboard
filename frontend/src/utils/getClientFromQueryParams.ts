import { DEFAULT_ORGANISATION_FOR_SUPERUSER } from "config";
import { ORGANIZATION_QUERY_FIELD } from "../constants";
import { CLIENT_QUERY_FIELD } from "./constructFiltersQueryParams";

export function getClientFromQueryParams(
  pathSearch: string,
  isSuperAdmin: boolean,
  organisationFromUserStore: string,
  cookieOrganization: string
): string {
  const searchParams = new URLSearchParams(pathSearch);
  const orgFromParams = searchParams.get(CLIENT_QUERY_FIELD) || searchParams.get(ORGANIZATION_QUERY_FIELD);
  if (orgFromParams) return orgFromParams;
  if (isSuperAdmin && cookieOrganization) return cookieOrganization;
  if (!isSuperAdmin) return organisationFromUserStore;
  if (organisationFromUserStore === "all") return DEFAULT_ORGANISATION_FOR_SUPERUSER;
  // isSuperAdmin && organisationFromUserStore is something not "all"
  return organisationFromUserStore;
}
