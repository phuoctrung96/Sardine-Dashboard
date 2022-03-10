ALTER TABLE invitation_tokens ALTER COLUMN organisation_id DROP NOT NULL;
ALTER TABLE invitation_tokens ALTER COLUMN token DROP NOT NULL;
ALTER TABLE invitation_tokens ALTER COLUMN email DROP  NOT NULL;

ALTER TABLE organisation ALTER COLUMN created_at DROP NOT NULL;

ALTER TABLE organisation ALTER COLUMN is_admin DROP DEFAULT;
ALTER TABLE organisation ALTER COLUMN is_admin DROP NOT NULL;

ALTER TABLE organization_jira ALTER COLUMN email DROP NOT NULL;
ALTER TABLE organization_jira ALTER COLUMN token DROP NOT NULL;
ALTER TABLE organization_jira ALTER COLUMN url DROP NOT NULL;
ALTER TABLE organization_jira ALTER COLUMN created_at DROP NOT NULL;

ALTER TABLE organization_webhooks ALTER COLUMN type DROP NOT NULL;
ALTER TABLE organization_webhooks ALTER COLUMN url DROP NOT NULL;
ALTER TABLE organization_webhooks ALTER COLUMN created_at DROP NOT NULL;

ALTER TABLE sessions ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE users ALTER COLUMN user_role DROP NOT NULL;
ALTER TABLE users ALTER COLUMN is_email_verified DROP NOT NULL;
