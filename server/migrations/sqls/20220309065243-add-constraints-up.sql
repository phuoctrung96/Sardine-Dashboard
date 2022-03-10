ALTER TABLE invitation_tokens ALTER COLUMN organisation_id SET NOT NULL;
ALTER TABLE invitation_tokens ALTER COLUMN token SET NOT NULL;

UPDATE invitation_tokens SET email = '' WHERE email IS NULL;
ALTER TABLE invitation_tokens ALTER COLUMN email SET NOT NULL;

ALTER TABLE organisation ALTER COLUMN created_at SET NOT NULL;

UPDATE organisation SET is_admin = false WHERE is_admin IS NULL;
ALTER TABLE organisation ALTER COLUMN is_admin SET DEFAULT false;
ALTER TABLE organisation ALTER COLUMN is_admin SET NOT NULL;

ALTER TABLE organization_jira ALTER COLUMN email SET NOT NULL;
ALTER TABLE organization_jira ALTER COLUMN token SET NOT NULL;
ALTER TABLE organization_jira ALTER COLUMN url SET NOT NULL;
ALTER TABLE organization_jira ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE organization_webhooks ALTER COLUMN type SET NOT NULL;
ALTER TABLE organization_webhooks ALTER COLUMN url SET NOT NULL;
ALTER TABLE organization_webhooks ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE sessions ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE users ALTER COLUMN user_role SET NOT NULL;
ALTER TABLE users ALTER COLUMN is_email_verified SET NOT NULL;
