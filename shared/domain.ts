/**
 * Enterprise wide business rules.
 * They are the least likely to change when something external changes.
 * For example, you would not expect these objects to be affected by a change to page navigation, or security.
 * No operational change to any particular application should affect the domain.
 * ref: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#entities
 */

export interface OrganizationUser {
  name: string;
  email: string;
  organisation: string;
  id: string;
  is_email_verified: boolean;
}

export interface Feedback {
  reason: string;
  scope: string;
  status: string;
  type: string;
  time: number;
}

export interface FeedbackRow {
  reason: string;
  scope: string;
  status: string;
  type: string;
  time: number;
  sessionKey: string;
  userId: string;
  country: string;
  city: string;
  reasonCodes: string;
  dateTime: string;
}

export interface DashboardInvitation {
  email: string; // "ryo+test-client-2@sardine.ai"
  expiredAt: string; // "2021-11-22T03:29:34.125Z"
  id: string; // "5"
  orgId: string; // "43"
  token: string; // "09616440-19d9-4d56-8a88-7305c16d5d56"
}
