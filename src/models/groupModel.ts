import {foreignKey, integer, pgTable, serial, varchar,} from "drizzle-orm/pg-core";
import {and, eq, sql} from "drizzle-orm";
import {db} from "../db";
import {users} from "./userModel";
import {groupcontent} from "../db/schema";
import {
    AddMemberInput,
    CreateGroupContentInput,
    CreateGroupInput,
    Group, groupMember,
    IdGroupInput,
    JoinGroupInput,
    RemoveMemberInput,
    UidIdGroupInput
} from "../types";

export const groups = pgTable("groups", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 45 }).notNull(),
    ownersId: integer("owners_id").notNull(),
    description: varchar({ length: 255 }).notNull(),
    category: varchar({ length: 45 }).notNull(),
    pictureUrl: varchar({ length: 255 }).notNull()
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

export const groupmembers = pgTable("groupmembers", {
    id: serial().primaryKey().notNull(),
    usersId: integer("users_id").notNull(),
    groupsId: integer("groups_id").notNull(),
    role: varchar({ length: 45 }).notNull()
}, (table) => {
    return {
        groupmembersUsersIdFkey: foreignKey({
            columns: [table.usersId],
            foreignColumns: [users.id],
            name: "groupmembers_users_id_fkey"
        }),
        groupmembersGroupsIdFkey: foreignKey({
            columns: [table.groupsId],
            foreignColumns: [groups.id],
            name: "groupmembers_groups_id_fkey"
        }),
    }
});

export const getAllGroups = async () => {
    return await db.select().from(groups);
};

export const postGroup = async (groupData: CreateGroupInput): Promise<Group> => {
    const [newGroup] = await db.insert(groups).values({
        ...groupData,
        pictureUrl: groupData.pictureUrl // Ensure pictureUrl is included
    }).returning();
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
    await db.insert(groupmembers).values({ groupsId: groupData.id, usersId: groupData.userId, role: 'member' });
    return true;
};

export const declineJoinRequestById = async (groupId: number, userId: number): Promise<boolean> => {
    const [request] = await db.select().from(joinrequests)
        .where(and(eq(joinrequests.groupsId, groupId), eq(joinrequests.usersId, userId), eq(joinrequests.status, 'pending')));
    if (!request) {
        return false;
    }
    await db.update(joinrequests)
        .set({ status: 'declined' })
        .where(eq(joinrequests.id, request.id));
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
    await db.insert(groupmembers).values({ groupsId: groupData.groupId, usersId: groupData.userId, role: groupData.role });
};

export const removeMembersByGroupId = async ({ groupId }: { groupId: number }): Promise<void> => {
    await db.delete(groupmembers).where(eq(groupmembers.groupsId, groupId));
};

export const findFeaturedGroups = async (userId: number) => {
    return await db
        .select({
            id: groups.id,
            name: groups.name,
            ownersId: groups.ownersId,
            description: groups.description,
            category: groups.category,
            pictureUrl: groups.pictureUrl,
            members: sql`COUNT(${groupmembers}.id)`.as('members')
        })
        .from(groups)
        .leftJoin(groupmembers, sql`${groups}.id = ${groupmembers}.groups_id`)
        .where(sql`${groupmembers}.users_id != ${userId} OR ${groupmembers}.role != 'owner'`)
        .groupBy(groups.id)
        .orderBy(sql`RANDOM()`)
        .limit(4);
};

export const findPopularGroups = async (userId: number) => {
    return await db
        .select({
            id: groups.id,
            name: groups.name,
            ownersId: groups.ownersId,
            description: groups.description,
            category: groups.category,
            pictureUrl: groups.pictureUrl,
            members: sql`COUNT(${groupmembers}.id)`.as('members')
        })
        .from(groups)
        .leftJoin(groupmembers, sql`${groups}.id = ${groupmembers}.groups_id`)
        .where(sql`${groupmembers}.users_id != ${userId} OR ${groupmembers}.role != 'owner'`)
        .groupBy(groups.id)
        .orderBy(sql`COUNT(${groupmembers}.id) DESC`)
        .limit(4);
};

export const findYourGroups = async (userId: number) => {
    return await db
        .select({
            id: groups.id,
            name: groups.name,
            ownersId: groups.ownersId,
            description: groups.description,
            category: groups.category,
            pictureUrl: groups.pictureUrl,
            members: sql`(SELECT COUNT(*) FROM ${groupmembers} WHERE ${groupmembers}.groups_id = ${groups}.id)`.as('members'),
            role: groupmembers.role
        })
        .from(groups)
        .leftJoin(groupmembers, sql`${groups}.id = ${groupmembers}.groups_id`)
        .where(eq(groupmembers.usersId, userId))
        .groupBy(groups.id, groupmembers.role);
};

export const findGroupsByName = async (name: string) => {
    return await db
        .select({
            id: groups.id,
            name: groups.name,
            ownersId: groups.ownersId,
            description: groups.description,
            category: groups.category,
            pictureUrl: groups.pictureUrl,
            members: sql`(SELECT COUNT(*) FROM ${groupmembers} WHERE ${groupmembers}.groups_id = ${groups}.id)`.as('members')
        })
        .from(groups)
        .where(sql`${groups.name} ILIKE ${'%' + name + '%'}`);
};

export const getMembersByGroupId = async ({ groupId }: { groupId: number }): Promise<groupMember[]> => {
    const members = await db.select({
        id: groupmembers.id,
        groupsId: groupmembers.groupsId,
        usersId: groupmembers.usersId,
        role: groupmembers.role,
        userName: users.name
    }).from(groupmembers)
        .leftJoin(users, eq(groupmembers.usersId, users.id))
        .where(eq(groupmembers.groupsId, groupId));
    return members;
};

export const checkGroupMember = async (groupData: { id: number, userId: number }): Promise<boolean> => {
    const [member] = await db.select().from(groupmembers)
        .where(and(eq(groupmembers.groupsId, groupData.id), eq(groupmembers.usersId, groupData.userId)));
    return !!member;
};

export const getJoinRequestsByGroupId = async (groupId: number) => {
    return await db
        .select({
            id: joinrequests.id,
            status: joinrequests.status,
            usersId: joinrequests.usersId,
            groupsId: joinrequests.groupsId,
            userName: users.name
        })
        .from(joinrequests)
        .leftJoin(users, eq(joinrequests.usersId, users.id))
        .where(eq(joinrequests.groupsId, groupId));
};