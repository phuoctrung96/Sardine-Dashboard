import { useMutation, useQuery, useQueryClient, UseMutationResult } from "react-query";
import {
  getClientIdObject,
  getRules,
  fetchOrganisationNames,
  fetchDeviceProfile,
  fetchInvitations,
  fetchDocumentVerification,
  getCustomerCryptoDetails,
  fetchSuperAdminEmailObjects,
  addSuperAdminEmail,
  deleteSuperAdminEmail,
} from "utils/api";
import {
  ClientIdObject,
  Rule,
  OrgName,
  DataSource,
  DashboardInvitation,
  DocumentVerification,
  EmailObject,
  CryptoDetailsResponse,
} from "sardine-dashboard-typescript-definitions";
import { CACHE_KEYS } from "../constants";
import { QueryResult } from "../interfaces/queryInterfaces";
import { fetchLatLng, LatLng } from "../components/GoogleMaps";
import { DeviceProfileResponse } from "../utils/api_response/deviceResponse";
import { captureException, ErrorWithResponseDataErrorObject } from "../utils/errorUtils";

export const useDeviceProfileFetchResult = ({
  clientId,
  orgName,
  sessionKey,
  source,
  enabled,
}: {
  clientId: string | null;
  orgName: string;
  sessionKey: string;
  source: DataSource;
  enabled: boolean;
}): QueryResult<DeviceProfileResponse> => {
  const { data, error, status } = useQuery<{ result: DeviceProfileResponse }, Error>(
    [CACHE_KEYS.DEVICE_PROFILE, orgName, sessionKey],
    () => fetchDeviceProfile({ organisation: orgName, sessionKey, source, clientId }),
    { enabled }
  );
  return {
    status,
    data: data === undefined ? undefined : data.result,
    error,
  };
};

export const useRulesFetchResult = ({
  clientId,
  checkpoint,
  enabled,
  orgName,
}: {
  clientId: string;
  checkpoint: string;
  enabled: boolean;
  orgName: string;
}): QueryResult<Rule[]> => {
  const { data, error, status } = useQuery<Rule[], Error>(
    [CACHE_KEYS.RULES, orgName, checkpoint],
    () => getRules(clientId, checkpoint),
    { enabled }
  );

  return {
    status,
    data,
    error,
  };
};

export const useClientIdFetchResult = ({
  organisation,
  enabled,
}: {
  organisation: string;
  enabled: boolean;
}): QueryResult<string> => {
  const { data, error, status } = useQuery<ClientIdObject, Error>(
    [CACHE_KEYS.CLIENT_ID, organisation],
    () => getClientIdObject(organisation),
    {
      enabled,
    }
  );
  return {
    status,
    error,
    data: data ? data.client_id : undefined,
  };
};

export const useOrganizationNamesResult = ({ enabled }: { enabled: boolean }): QueryResult<OrgName[]> => {
  const { data, error, status } = useQuery<OrgName[], Error>([CACHE_KEYS.ORGANIZATION_NAMES], () => fetchOrganisationNames(), {
    enabled,
  });

  return {
    status,
    data,
    error,
  };
};

export const useDashboardInvitationsFetchResult = ({
  enabled,
  orgName,
}: {
  enabled: boolean;
  orgName: string;
}): QueryResult<DashboardInvitation[]> => {
  const { data, error, status } = useQuery<DashboardInvitation[], Error>(
    [CACHE_KEYS.DASHBOARD_INVITATIONS, orgName],
    () => fetchInvitations(orgName),
    {
      enabled,
    }
  );

  return {
    status,
    data,
    error,
  };
};

export const useDocumentVerificationFetchResult = ({
  enabled,
  id,
}: {
  enabled: boolean;
  id: string;
}): QueryResult<DocumentVerification> => {
  const { data, error, status } = useQuery<DocumentVerification, Error>(
    [CACHE_KEYS.DOCUMENT_VERIFICATION, id],
    () => fetchDocumentVerification(id),
    {
      enabled,
    }
  );

  return {
    status,
    data,
    error,
  };
};

// When it is used, caller should be in @googlemaps/react-Wrapper. If not, it might fail because it might not have loaded the JS.
export const useLatLngFetchResult = ({ enabled, address }: { enabled: boolean; address: string }): QueryResult<LatLng> => {
  const { data, error, status } = useQuery<LatLng, Error>([CACHE_KEYS.LAT_LNG, address], () => fetchLatLng(address), { enabled });
  return { status, data, error };
};

export const useSuperAdminEmailObjectsFetchResult = ({ enabled }: { enabled: boolean }): QueryResult<EmailObject[]> => {
  const { data, error, status } = useQuery<EmailObject[], Error>(
    [CACHE_KEYS.SUPER_ADMIN_EMAILS],
    () => fetchSuperAdminEmailObjects(),
    {
      enabled,
    }
  );

  return {
    status,
    data,
    error,
  };
};

export const useAddSuperAdminEmailMutation = (): UseMutationResult<
  EmailObject,
  ErrorWithResponseDataErrorObject | unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation((email: string) => addSuperAdminEmail(email), {
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries(CACHE_KEYS.SUPER_ADMIN_EMAILS).then().catch(captureException);
    },
  });
  return mutation;
};

export const useDeleteSuperAdminEmailMutation = (): UseMutationResult<
  EmailObject,
  ErrorWithResponseDataErrorObject | unknown,
  number,
  unknown
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => deleteSuperAdminEmail(id), {
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries(CACHE_KEYS.SUPER_ADMIN_EMAILS).then().catch(captureException);
    },
  });
  return mutation;
};

export const useCustomerCryptoDetailsFetchResult = ({
  customerId,
  clientId,
  enabled,
}: {
  customerId: string;
  clientId: string;
  enabled: boolean;
}): QueryResult<{ result: CryptoDetailsResponse[] }> => {
  const { data, error, status } = useQuery<{ result: CryptoDetailsResponse[] }, Error>(
    [CACHE_KEYS.CUSTOMER_CRYPTO_DETAILS],
    () => getCustomerCryptoDetails(customerId, clientId),
    {
      enabled,
    }
  );

  return {
    status,
    data,
    error,
  };
};
