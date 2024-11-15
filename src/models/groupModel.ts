import {
    pgTable,
    foreignKey,
    serial,
    integer,
    varchar,

} from "drizzle-orm/pg-core";
import {eq, and} from "drizzle-orm";
import { db } from "../db";
import {users} from "./userModel";
import {groupcontent, groupmembers} from "../db/schema";
import {
    AddMemberInput,
    CreateGroupContentInput,
    CreateGroupInput,
    Group,
    IdGroupInput,
    JoinGroupInput,
    RemoveMemberInput,
    UidIdGroupInput
} from "../types";

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

export const joinrequests = pgTable("joinrequests", {
    id: serial().primaryKey().notNull(),
    status: varchar({ length: 45 }).default('pending'),
    usersId: integer("users_id").notNull(),
    groupsId: integer("groups_id").notNull(),
}, (table) => {
    return {
        joinrequestsGroupsIdFkey: foreignKey({
            columns: [table.groupsId],
            foreignColumns: [groups.id],
            name: "joinrequests_groups_id_fkey"
        }),
        joinrequestsUsersIdFkey: foreignKey({
            columns: [table.usersId],
            foreignColumns: [users.id],
            name: "joinrequests_users_id_fkey"
        }),
    }
});

export const getAllGroups = async () => {
    return await db.select().from(groups);
};

export const postGroup = async (groupData: CreateGroupInput): Promise<Group> => {
    await db.insert(groups).values(groupData).returning();
    const [newGroup] = await db.select().from(groups).where(eq(groups.name, groupData.name));
    return newGroup;
};

export const deleteGroupById = async (groupData: IdGroupInput): Promise<Group> => {
    const [deletedGroup] = await db.delete(groups).where(eq(groups.id, groupData.id)).returning();
    return deletedGroup;
};

export const getGroupById = async (groupData: IdGroupInput): Promise<Group> => {
    const [group] = await db.select().from(groups).where(eq(groups.id, groupData.id));
    return group;
};

export const joinGroupById = async (groupData: UidIdGroupInput): Promise<boolean> => {
    const [group] = await db.select().from(groups).where(eq(groups.id, groupData.id));
    if (!group) {
        return false;
    }
    const [existingRequest] = await db.select().from(joinrequests)
        .where(and(eq(joinrequests.groupsId, groupData.id), eq(joinrequests.usersId, groupData.userId)));
    if (existingRequest) {
        return false;
    }
    await db.insert(joinrequests).values({ groupsId: groupData.id, usersId: groupData.userId });
    return true;
};

const isGroupMember = async (groupData: UidIdGroupInput): Promise<boolean> => {
    const [member] = await db.select().from(groupmembers)
        .where(and(eq(groupmembers.groupsId, groupData.id), eq(groupmembers.usersId, groupData.userId)));
    return !!member;
};

export const acceptJoinRequest = async (groupData: JoinGroupInput): Promise<boolean> => {
    const [group] = await db.select().from(groups).where(eq(groups.id, groupData.id));
    if (!group || group.ownersId !== groupData.ownerId) {
        return false;
    }
    const [request] = await db.select().from(joinrequests)
        .where(and(eq(joinrequests.groupsId, groupData.id), eq(joinrequests.usersId, groupData.userId), eq(joinrequests.status, 'pending')));
    if (!request) {
        return false;
    }
    await db.update(joinrequests)
        .set({ status: 'accepted' })
        .where(eq(joinrequests.id, request.id));
    await db.insert(groupmembers).values({ groupsId: groupData.id, usersId: groupData.userId });
    return true;
};

export const removeMember = async (groupData: RemoveMemberInput): Promise<boolean> => {
    const [group] = await db.select().from(groups).where(eq(groups.id, groupData.id));
    if (!group) {
        return false;
    }
    if (groupData.ownerId !== null) {
        if (group.ownersId !== groupData.ownerId) {
            return false;
        }
    } else {
        if (!await isGroupMember({ id: groupData.id, userId: groupData.userId })) {
            return false;
        }
    }
    await db.delete(groupmembers)
        .where(and(eq(groupmembers.groupsId, groupData.id), eq(groupmembers.usersId, groupData.userId)));
    return true;
};

export const addContent = async (groupData: CreateGroupContentInput): Promise<boolean> => {
    if (!await isGroupMember({ id: groupData.groupsId, userId: groupData.addedByUserId })) {
        return false;
    }
    await db.insert(groupcontent).values({ groupsId: groupData.groupsId, addedByUserId: groupData.addedByUserId, movieId: groupData.movieId });
    return true;
};

export const getContentFromModel = async (groupData: UidIdGroupInput) => {
    if (!await isGroupMember({ id: groupData.id, userId: groupData.userId })) {
        return false;
    }
    const [content] = await db.select().from(groupcontent).where(eq(groupcontent.groupsId, groupData.id));
    return content;
};

export const addMember = async (groupData: AddMemberInput): Promise<void> => {
    await db.insert(groupmembers).values({ groupsId: groupData.groupId, usersId: groupData.userId });
};

export const removeMembersByGroupId = async ({ groupId }: { groupId: number }): Promise<void> => {
    await db.delete(groupmembers).where(eq(groupmembers.groupsId, groupId));
};