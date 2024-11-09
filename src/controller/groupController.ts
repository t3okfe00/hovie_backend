import { Request, Response } from "express-serve-static-core";
import {
    getAllGroups,
    postGroup,
    deleteGroupById,
    getGroupById,
    joinGroupById,
    acceptJoinRequest, removeMember, addContent, getContentFromModel
} from "../models/groupModel";
import {NextFunction} from "express";
import ApiError from "../helpers/ApiError";
import {Group} from "../types";



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
        const { name, ownersId } = req.query;
        if (!name || !ownersId) {
            next(new ApiError("name and ownersId are required", 400));
            return;
        }
        const newGroup: Group = await postGroup({ name: String(name).replace(/"/g, ''), ownersId: Number(ownersId) });
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
        const deleted = await deleteGroupById({ id: Number(id) });
        if (!deleted) {
            next(new ApiError("Group not found", 404));
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
        const { userId, content } = req.body;
        if (!id || !userId || !content) {
            next(new ApiError("id, userId, and content are required", 400));
            return;
        }
        const added = await addContent({addedByUserId: Number(userId), movieId: Number(content), groupsId: Number(id)});
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