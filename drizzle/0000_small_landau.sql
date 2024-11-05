CREATE TABLE IF NOT EXISTS "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"added_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"users_id" integer NOT NULL,
	"movies_id" integer NOT NULL,
	"movie_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groupcontent" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp DEFAULT CURRENT_TIMESTAMP,
	"added_by_user_id" integer,
	"groups_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groupmembers" (
	"id" serial PRIMARY KEY NOT NULL,
	"users_id" integer NOT NULL,
	"groups_id" integer NOT NULL,
	"role" varchar(45) DEFAULT 'member'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(45) NOT NULL,
	"owners_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "joinrequests" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(45) DEFAULT 'pending',
	"users_id" integer NOT NULL,
	"groups_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"movies_id" integer NOT NULL,
	"users_id" integer NOT NULL,
	"rating" integer,
	"description" varchar(500),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"upvote" integer DEFAULT 0,
	"finn_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(45) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" varchar(45) NOT NULL,
	"profile_url" varchar(70) NOT NULL,
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_password_key" UNIQUE("password")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupcontent" ADD CONSTRAINT "groupcontent_groups_id_groups_id_fk" FOREIGN KEY ("groups_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupmembers" ADD CONSTRAINT "groupmembers_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupmembers" ADD CONSTRAINT "groupmembers_groups_id_groups_id_fk" FOREIGN KEY ("groups_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_owners_id_users_id_fk" FOREIGN KEY ("owners_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "joinrequests" ADD CONSTRAINT "joinrequests_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "joinrequests" ADD CONSTRAINT "joinrequests_groups_id_groups_id_fk" FOREIGN KEY ("groups_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
