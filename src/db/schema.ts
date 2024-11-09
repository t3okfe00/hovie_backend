import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  unique,
  foreignKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// `users` table remains the same
export const users = pgTable(
  "users",
  {
    id: serial().primaryKey().notNull(),
    email: varchar({ length: 45 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    name: varchar({ length: 45 }).notNull(),
    profileUrl: varchar("profile_url", { length: 70 }).notNull(),
  },
  (table) => {
    return {
      usersEmailKey: unique("users_email_key").on(table.email),
      usersPasswordKey: unique("users_password_key").on(table.password),
    };
  }
);

// `reviews` table with cascading behavior for both delete and update
export const reviews = pgTable("reviews", {
  id: serial().primaryKey().notNull(),
  moviesId: integer("movies_id").notNull(),
  usersId: integer("users_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  rating: integer(),
  description: varchar({ length: 500 }),
  createdAt: timestamp("created_at", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  upvote: integer().default(0),
  finnId: integer("finn_id"),
});

// `groups` table with cascading behavior for both delete and update
export const groups = pgTable("groups", {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 45 }).notNull(),
  ownersId: integer("owners_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// `favorites` table with cascading behavior for both delete and update
export const favorites = pgTable("favorites", {
  id: serial().primaryKey().notNull(),
  addedAt: timestamp("added_at", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  usersId: integer("users_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  moviesId: integer("movies_id").notNull(),
  movieName: varchar("movie_name").notNull(),
});

// `groupmembers` table with cascading behavior for both delete and update
export const groupmembers = pgTable("groupmembers", {
  id: serial().primaryKey().notNull(),
  usersId: integer("users_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  groupsId: integer("groups_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade", onUpdate: "cascade" }),
  role: varchar({ length: 45 }).default("member"),
});

// `joinrequests` table with cascading behavior for both delete and update
export const joinrequests = pgTable("joinrequests", {
  id: serial().primaryKey().notNull(),
  status: varchar({ length: 45 }).default("pending"),
  usersId: integer("users_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  groupsId: integer("groups_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// `groupcontent` table with cascading behavior for both delete and update
export const groupcontent = pgTable(
  "groupcontent",
  {
    id: serial().primaryKey().notNull(),
    timestamp: timestamp({ mode: "string" }).default(sql`CURRENT_TIMESTAMP`),
    addedByUserId: integer("added_by_user_id"),
    groupsId: integer("groups_id").notNull(),
    movieId: integer("movie_id").notNull(),
  },
  (table) => {
    return {
      groupcontentGroupsIdFkey: foreignKey({
        columns: [table.groupsId],
        foreignColumns: [groups.id],
        name: "groupcontent_groups_id_fkey",
      }),
    };
  }
);

// import { pgTable, foreignKey, serial, integer, varchar, timestamp, unique } from "drizzle-orm/pg-core"
// import { sql } from "drizzle-orm"

// export const reviews = pgTable("reviews", {
// 	id: serial().primaryKey().notNull(),
// 	moviesId: integer("movies_id").notNull(),
// 	usersId: integer("users_id").notNull(),
// 	rating: integer(),
// 	description: varchar({ length: 500 }),
// 	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
// 	upvote: integer().default(0),
// 	finnId: integer("finn_id"),
// }, (table) => {
// 	return {
// 		reviewsUsersIdFkey: foreignKey({
// 			columns: [table.usersId],
// 			foreignColumns: [users.id],
// 			name: "reviews_users_id_fkey"
// 		}),
// 	}
// });

// export const users = pgTable("users", {
// 	id: serial().primaryKey().notNull(),
// 	email: varchar({ length: 45 }).notNull(),
// 	password: varchar({ length: 255 }).notNull(),
// 	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
// 	name: varchar({ length: 45 }).notNull(),
// 	profileUrl: varchar("profile_url", { length: 70 }).notNull(),
// }, (table) => {
// 	return {
// 		usersEmailKey: unique("users_email_key").on(table.email),
// 		usersPasswordKey: unique("users_password_key").on(table.password),
// 	}
// });

// export const groups = pgTable("groups", {
// 	id: serial().primaryKey().notNull(),
// 	name: varchar({ length: 45 }).notNull(),
// 	ownersId: integer("owners_id").notNull(),
// }, (table) => {
// 	return {
// 		groupsOwnersIdFkey: foreignKey({
// 			columns: [table.ownersId],
// 			foreignColumns: [users.id],
// 			name: "groups_owners_id_fkey"
// 		}),
// 	}
// });

// export const favorites = pgTable("favorites", {
// 	id: serial().primaryKey().notNull(),
// 	addedAt: timestamp("added_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
// 	usersId: integer("users_id").notNull(),
// 	moviesId: integer("movies_id").notNull(),
// 	movieName: varchar("movie_name").notNull(),
// }, (table) => {
// 	return {
// 		favoritesUsersIdFkey: foreignKey({
// 			columns: [table.usersId],
// 			foreignColumns: [users.id],
// 			name: "favorites_users_id_fkey"
// 		}),
// 	}
// });

// export const groupmembers = pgTable("groupmembers", {
// 	id: serial().primaryKey().notNull(),
// 	usersId: integer("users_id").notNull(),
// 	groupsId: integer("groups_id").notNull(),
// 	role: varchar({ length: 45 }).default('member'),
// }, (table) => {
// 	return {
// 		groupmembersGroupsIdFkey: foreignKey({
// 			columns: [table.groupsId],
// 			foreignColumns: [groups.id],
// 			name: "groupmembers_groups_id_fkey"
// 		}),
// 		groupmembersUsersIdFkey: foreignKey({
// 			columns: [table.usersId],
// 			foreignColumns: [users.id],
// 			name: "groupmembers_users_id_fkey"
// 		}),
// 	}
// });

// export const joinrequests = pgTable("joinrequests", {
// 	id: serial().primaryKey().notNull(),
// 	status: varchar({ length: 45 }).default('pending'),
// 	usersId: integer("users_id").notNull(),
// 	groupsId: integer("groups_id").notNull(),
// }, (table) => {
// 	return {
// 		joinrequestsGroupsIdFkey: foreignKey({
// 			columns: [table.groupsId],
// 			foreignColumns: [groups.id],
// 			name: "joinrequests_groups_id_fkey"
// 		}),
// 		joinrequestsUsersIdFkey: foreignKey({
// 			columns: [table.usersId],
// 			foreignColumns: [users.id],
// 			name: "joinrequests_users_id_fkey"
// 		}),
// 	}
// });

// export const groupcontent = pgTable("groupcontent", {
// 	id: serial().primaryKey().notNull(),
// 	timestamp: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
// 	addedByUserId: integer("added_by_user_id"),
// 	groupsId: integer("groups_id").notNull(),
// }, (table) => {
// 	return {
// 		groupcontentGroupsIdFkey: foreignKey({
// 			columns: [table.groupsId],
// 			foreignColumns: [groups.id],
// 			name: "groupcontent_groups_id_fkey"
// 		}),
// 	}
// });
