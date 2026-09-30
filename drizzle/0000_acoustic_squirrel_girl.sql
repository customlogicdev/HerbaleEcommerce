CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" varchar(50) NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(100) NOT NULL,
	"zip" varchar(20) NOT NULL,
	"country" varchar(100) NOT NULL,
	"notes" text,
	"items" jsonb NOT NULL,
	"subtotal" integer NOT NULL,
	"shipping" integer NOT NULL,
	"tax" integer NOT NULL,
	"total" integer NOT NULL,
	"status" varchar(50) DEFAULT 'placed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
