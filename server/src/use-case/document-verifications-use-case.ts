import { createFailure, createSuccess, DocumentVerification, Result } from "sardine-dashboard-typescript-definitions";
import { Org, UserRole, User } from "@prisma/client";
import { findUser } from "../repository/userRepository";
import { findOrg } from "../repository/orgRepository";
import { DocumentVerficationDS } from "../commons/models/datastore/document-verifications";
import { generateSignedDocumentVerificationImages } from "../commons/document-verifications";

const DOC_NOT_FOUND = "Document not found";
const ORG_NOT_FOUND = "Organization not found";
const USER_NOT_FOUND = "User not found";
type Reason = typeof DOC_NOT_FOUND | typeof ORG_NOT_FOUND | typeof USER_NOT_FOUND;

interface FailureObject {
  message: string;
  reason: Reason;
}

const canUserAccessOrg = async (user: User, org: Org): Promise<boolean> => {
  if (user.userRole === UserRole.SARDINE_ADMIN) {
    return true;
  }
  if (user.orgId === org.id) {
    return true;
  }
  if (user.userRole !== UserRole.MULTI_ORG_ADMIN) {
    return false; // Normal user can't access other orgs.
  }

  // If the user's org is not the doc verification's org, we need to check in depth.
  // If the doc verification's org is a child of another org and that is user's org, it is OK to see the doc verification.
  // Otherwise, the user must not see the document verification.
  if (org.parentOrgClientId === null) {
    return false;
  }
  const parent = await findOrg({ clientId: org.parentOrgClientId });
  if (parent === undefined) {
    return false;
  }
  return parent.id === user.orgId;
};

export const fetchDocumentVerification = async (
  id: string,
  sessionId: string
): Promise<
  Result<
    { documentVerification: DocumentVerification; images: Awaited<ReturnType<typeof generateSignedDocumentVerificationImages>> },
    FailureObject
  >
> => {
  const data = await DocumentVerficationDS.queryById(id);

  if (!data) return createFailure({ message: `Document Verification not found`, reason: DOC_NOT_FOUND });
  const clientId = data.client_id;
  const org = await findOrg({ clientId });
  if (org === undefined) {
    return createFailure({ message: `Organization not found`, reason: ORG_NOT_FOUND });
  }

  const user = await findUser({ sessionId });

  // If the user does not exist, something wrong must have happened.
  if (user === undefined) {
    return createFailure({ message: `User not found`, reason: USER_NOT_FOUND });
  }

  const canAccess = await canUserAccessOrg(user, org);
  if (!canAccess) {
    return createFailure({ message: `Document verification not found`, reason: DOC_NOT_FOUND });
  }

  const images = await generateSignedDocumentVerificationImages(data);
  return createSuccess({ documentVerification: data, images });
};
