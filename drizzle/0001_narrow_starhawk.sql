ALTER TABLE "groupcontent" DROP CONSTRAINT "groupcontent_groups_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "groupcontent" ADD COLUMN "movie_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "groupcontent" ADD COLUMN "message" varchar(255);--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "description" varchar(255);--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "user_name" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupcontent" ADD CONSTRAINT "groupcontent_groups_id_fkey" FOREIGN KEY ("groups_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
