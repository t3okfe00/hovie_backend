import {
    pgTable,
    foreignKey,
    serial,
    integer,
    varchar,
    timestamp,
    unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { db } from "../db";
import {users} from "./userModel";
import { Request } from "express-serve-static-core";

export const groups = pgTable("groups", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 45 }).notNull(),
    ownersId: integer("owners_id").notNull(),
}, (table) => {
    return {
        groupsOwnersIdFkey: foreignKey({
            columns: [table.ownersId],
            foreignColumns: [users.id],
            name: "groups_owners_id_fkey"
        }),
    }
});

export const getAllGroups = async () => {
    return await db.select().from(groups);
};

export const postGroup = async ({ name, ownersId }: { name: string; ownersId: number }) => {
    return await db.insert(groups).values({ name, ownersId }).returning();
};