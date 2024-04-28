CREATE TABLE IF NOT EXISTS "verificationToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"token" text,
	"expires" timestamp,
	CONSTRAINT "verificationToken_token_unique" UNIQUE("token"),
	CONSTRAINT "verificationToken_email_token_unique" UNIQUE("email","token")
);
