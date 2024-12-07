import { Request, Response } from "express-serve-static-core";
import {
    getAllGroups,
    postGroup,
    deleteGroupById,
    getGroupById,
    joinGroupById,
    acceptJoinRequest, removeMember, addContent, getContentFromModel,
    addMember,
    removeMembersByGroupId, findFeaturedGroups, findPopularGroups, findYourGroups, findGroupsByName,
    getMembersByGroupId,
    checkGroupMember,
    getJoinRequestsByGroupId,
    declineJoinRequestById
} from "../models/groupModel";
import {NextFunction} from "express";
import ApiError from "../helpers/ApiError";
import {Group} from "../types";
import {promisify} from "util";
import fs from "fs";
import path from "path";
const unlinkAsync = promisify(fs.unlink);



export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await getAllGroups();
        res.json(groups);
    } catch (error) {
        next(new ApiError("Failed to fetch groups from the database", 500));
    }
};


export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, ownersId, category, description } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !ownersId || !category || !description || !imagePath) {
            next(new ApiError("name, ownersId, category, description, and imagePath are required", 400));
            return;
        }

        // Create the group and get the new group's ID
        const newGroup: Group = await postGroup({
            name: String(name).replace(/"/g, ''),
            ownersId: Number(ownersId),
            category: String(category).replace(/"/g, ''),
            description: String(description).replace(/"/g, ''),
            pictureUrl: imagePath
        });

        // Add the owner as a member of the group with the role "owner"
        await addMember({ groupId: newGroup.id, userId: ownersId, role: 'owner' });

        res.status(201).json(newGroup);
    } catch (error) {
        next(new ApiError("Error creating group", 500));
    }
};

export const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) {
            next(new ApiError("id is required", 400));
            return;
        }

        // Get the group details to retrieve the image path
        const group = await getGroupById({ id: Number(id) });
        if (!group) {
            next(new ApiError("Group not found", 404));
            return;
        }

        // Remove all members of the group
        await removeMembersByGroupId({ groupId: Number(id) });

        // Delete the group
        const deleted = await deleteGroupById({ id: Number(id) });
        if (!deleted) {
            next(new ApiError("Group not found", 404));
            return;
        }

        // Delete the image file from the uploads folder
        const imagePath = path.join('uploads', path.basename(group.pictureUrl));
        try {
            await unlinkAsync(imagePath);
        } catch (error) {
            // @ts-ignore
            console.error(`Failed to delete image file: ${error.message}`);
        }

        res.status(204).send();
    } catch (error) {
        next(new ApiError("Error deleting group", 500));
    }
};

export const getGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            next(new ApiError("id is required", 400));
            return;
        }
        const group = await getGroupById({ id: Number(id) });
        if (!group) {
            next(new ApiError("Group not found", 404));
            return;
        }
        res.json(group);
    } catch (error) {
        next(new ApiError("Error fetching group", 500));
    }
};

export const joinGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!id || !userId) {
            next(new ApiError("id and userId are required", 400));
            return;
        }
        const joined = await joinGroupById({ id: Number(id), userId: Number(userId) });
        if (!joined) {
            next(new ApiError("Group not found or join request already exists", 404));
            return;
        }
        res.status(200).json({ message: "Join request submitted successfully" });
    } catch (error) {
        next(new ApiError("Error joining group", 500));
    }
};

export const addMemberToGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId, ownerId } = req.body;
        if (!id || !userId || !ownerId) {
            next(new ApiError("id, userId, and ownerId are required", 400));
            return;
        }
        const accepted = await acceptJoinRequest({ id: Number(id), userId: Number(userId), ownerId: Number(ownerId) });
        if (!accepted) {
            next(new ApiError("Group not found, you are not the owner, or join request does not exist", 404));
            return;
        }
        res.status(200).json({ message: "Member added to group successfully" });
    } catch (error) {
        next(new ApiError("Error adding member to group", 500));
    }
};

export const declineJoinRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId, ownerId } = req.body;
        if (!id || !userId || !ownerId) {
            next(new ApiError("id, userId, and ownerId are required", 400));
            return;
        }
        const group = await getGroupById({ id: Number(id) });
        if (!group || group.ownersId !== Number(ownerId)) {
            next(new ApiError("Group not found or you are not the owner", 404));
            return;
        }
        const declined = await declineJoinRequestById(Number(id), Number(userId));
        if (!declined) {
            next(new ApiError("Join request not found or already processed", 404));
            return;
        }
        res.status(200).json({ message: "Join request declined successfully" });
    } catch (error) {
        next(new ApiError("Error declining join request", 500));
    }
};

export const removeMemberFromGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id, userId } = req.params;
        const { ownerId } = req.body;
        if (!id || !userId) {
            next(new ApiError("id and userId are required", 400));
            return;
        }
        const removed = await removeMember({ id: Number(id), userId: Number(userId), ownerId: ownerId ? Number(ownerId) : null });
        if (!removed) {
            next(new ApiError("Group not found, you are not the owner, or member does not exist", 404));
            return;
        }
        res.status(200).json({ message: "Member removed from group successfully" });
    } catch (error) {
        next(new ApiError("Error removing member from group", 500));
    }
};

export const addContentToGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId, content, message } = req.body;
        if (!id || !userId || !content) {
            next(new ApiError("id, userId, and content are required", 400));
            return;
        }
        const added = await addContent({
            addedByUserId: Number(userId),
            movieId: Number(content),
            groupsId: Number(id),
            message: String(message)
        });
        if (!added) {
            next(new ApiError("Group not found or you are not a member", 404));
            return;
        }
        res.status(200).json({ message: "Content added to group successfully" });
    } catch (error) {
        next(new ApiError("Error adding content to group", 500));
    }
};

export const getContentFromGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!id || !userId) {
            next(new ApiError("id and userId are required", 400));
            return;
        }
        const content = await getContentFromModel({ id: Number(id), userId: Number(userId) });
        if (content === null) {
            next(new ApiError("Group not found or you are not a member", 404));
            return;
        }
        res.status(200).json(content);
    } catch (error) {
        next(new ApiError("Error fetching content from group", 500));
    }
};

export const getFeaturedGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await findFeaturedGroups();
        res.json(groups.map(group => ({
            ...group,
            pictureUrl: group.pictureUrl
        })));
    } catch (error) {
        next(new ApiError("Failed to fetch groups from the database", 500));
    }
};

export const getPopularGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await findPopularGroups();
        res.json(groups.map(group => ({
            ...group,
            pictureUrl: group.pictureUrl
        })));
    } catch (error) {
        next(new ApiError("Failed to fetch popular groups from the database", 500));
    }
};

export const getYourGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            next(new ApiError("userId is required", 400));
            return;
        }

        const yourGroups = await findYourGroups(Number(userId));
        res.status(200).json(yourGroups.map(group => ({
            ...group,
            pictureUrl: group.pictureUrl
        })));
    } catch (error) {
        next(new ApiError("Error fetching your groups", 500));
    }
};

export const searchGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.query;
        if (!name) {
            next(new ApiError("name query parameter is required", 400));
            return;
        }

        const groups = await findGroupsByName(String(name));
        res.status(200).json(groups.map(group => ({
            ...group,
            pictureUrl: group.pictureUrl
        })));
    } catch (error) {
        next(new ApiError("Error searching for groups", 500));
    }
};

export const getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!id || !userId) {
            next(new ApiError("id and userId are required", 400));
            return;
        }

        const isMember = await checkGroupMember({ id: Number(id), userId: Number(userId) });
        if (!isMember) {
            next(new ApiError("You are not a member of this group", 403));
            return;
        }

        const members = await getMembersByGroupId({ groupId: Number(id) });
        if (!members) {
            next(new ApiError("Group not found", 404));
            return;
        }

        res.status(200).json(members);
    } catch (error) {
        next(new ApiError("Error fetching members", 500));
    }
};

export const getAllJoinRequests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!id || !userId) {
            next(new ApiError("groupId and userId are required", 400));
            return;
        }

        const group = await getGroupById({ id: Number(id) });
        if (!group) {
            next(new ApiError("Group not found", 404));
            return;
        }

        if (group.ownersId !== Number(userId)) {
            next(new ApiError("You are not the owner of this group", 403));
            return;
        }

        const requests = await getJoinRequestsByGroupId(Number(id));
        res.status(200).json(requests);
    } catch (error) {
        next(new ApiError("Error fetching join requests", 500));
    }
};