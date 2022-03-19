import React from "react";
import styled from "styled-components";
import { getCustomerProfilePath, getSessionDetailsPath } from "../../utils/pathUtils";
import { getLimitSessionKey } from "../../utils/customerSessionUtils";
import { SESSION_KEY_LIMIT } from "../../constants";

export const Link = styled.a`
  color: #325078;
`;

export const CustomerProfileLink: React.FC<{ customerId: string; clientId: string; text?: string }> = ({
  customerId,
  clientId,
  text,
}) => (
  <Link href={getCustomerProfilePath({ customerId, clientId })} rel="noreferrer" target="_blank">
    {text === undefined ? customerId : text}
  </Link>
);

export const SessionDetailsLink: React.FC<{ customerId: string; clientId: string; sessionKey: string; text?: string }> = ({
  customerId,
  clientId,
  sessionKey,
  text,
}) => (
  <Link href={getSessionDetailsPath({ customerId, clientId, sessionKey })} rel="noreferrer" target="_blank">
    {text === undefined ? getLimitSessionKey(sessionKey, SESSION_KEY_LIMIT) : text}
  </Link>
);
