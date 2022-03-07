import { CUSTOMER_PROFILE_PATH, SESSION_DETAILS_PATH } from "../modulePaths";

export const getCustomerProfilePath = ({ customerId, clientId }: { customerId: string; clientId: string }): string =>
  `${CUSTOMER_PROFILE_PATH}?customerId=${encodeURIComponent(customerId)}&clientId=${clientId}`;

export const getSessionDetailsPath = ({
  customerId,
  clientId,
  sessionKey,
}: {
  customerId: string;
  clientId: string;
  sessionKey: string;
}): string =>
  `${SESSION_DETAILS_PATH}?client_id=${clientId}&sessionKey=${sessionKey}&customerId=${encodeURIComponent(customerId)}`;
