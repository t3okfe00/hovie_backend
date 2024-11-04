import { relations } from "drizzle-orm/relations";
import { users, reviews, groups, favorites, groupmembers, joinrequests, groupcontent } from "./schema";

export const reviewsRelations = relations(reviews, ({one}) => ({
	user: one(users, {
		fields: [reviews.usersId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	reviews: many(reviews),
	groups: many(groups),
	favorites: many(favorites),
	groupmembers: many(groupmembers),
	joinrequests: many(joinrequests),
}));

export const groupsRelations = relations(groups, ({one, many}) => ({
	user: one(users, {
		fields: [groups.ownersId],
		references: [users.id]
	}),
	groupmembers: many(groupmembers),
	joinrequests: many(joinrequests),
	groupcontents: many(groupcontent),
}));

export const favoritesRelations = relations(favorites, ({one}) => ({
	user: one(users, {
		fields: [favorites.usersId],
		references: [users.id]
	}),
}));

export const groupmembersRelations = relations(groupmembers, ({one}) => ({
	group: one(groups, {
		fields: [groupmembers.groupsId],
		references: [groups.id]
	}),
	user: one(users, {
		fields: [groupmembers.usersId],
		references: [users.id]
	}),
}));

export const joinrequestsRelations = relations(joinrequests, ({one}) => ({
	group: one(groups, {
		fields: [joinrequests.groupsId],
		references: [groups.id]
	}),
	user: one(users, {
		fields: [joinrequests.usersId],
		references: [users.id]
	}),
}));

export const groupcontentRelations = relations(groupcontent, ({one}) => ({
	group: one(groups, {
		fields: [groupcontent.groupsId],
		references: [groups.id]
	}),
}));