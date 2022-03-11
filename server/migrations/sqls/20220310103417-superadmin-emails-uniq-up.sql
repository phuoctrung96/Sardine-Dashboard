ALTER TABLE superadmin_emails
ADD CONSTRAINT superadmin_emails_email_unique unique (email);
