import { Request, Response } from "express-serve-static-core";
import {
    getAllGroups,
    postGroup,
    deleteGroupById,
    getGroupById,
    joinGroupById,
    acceptJoinRequest, removeMember, addContent, getContentFromModel
} from "../models/groupModel";

export const getGroups = async (req: Request, res: Response) => {
    try {
        const groups = await getAllGroups();
        res.json(groups);
    } catch (error) {
        res.json({ message: "Error" });
    }
};


export const createGroup = async (req: Request, res: Response) => {
    try {
        const { name, ownersId } = req.query;
        if (!name || !ownersId) {
            return res.status(400).json({ message: "name and ownersId are required" });
        }
        const newGroup = await postGroup({ name: String(name).replace(/"/g, ''), ownersId: Number(ownersId) });
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }
        const deleted = await deleteGroupById(Number(id));
        if (!deleted) {
            return res.status(404).json({ message: "Group not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

export const getGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "id is required" });
            return;
        }
        const group = await getGroupById(Number(id));
        if (!group) {
            res.status(404).json({ message: "Group not found" });
            return;
        }
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

export const joinGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!id || !userId) {
            res.status(400).json({ message: "id and userId are required" });
            return;
        }
        const joined = await joinGroupById(Number(id), Number(userId));
        if (!joined) {
            res.status(404).json({ message: "Group not found or join request already exists" });
            return;
        }
        res.status(200).json({ message: "Join request submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

export const addMemberToGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!id || !userId) {
            res.status(400).json({ message: "id and userId are required" });
            return;
        }
        const accepted = await acceptJoinRequest(Number(id), Number(userId));
        if (!accepted) {
            res.status(404).json({ message: "Group not found, join request does not exist, or you are not the owner" });
            return;
        }
        res.status(200).json({ message: "Member added to group successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

export const removeMemberFromGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, userId } = req.params;
        const { ownerId } = req.body;
        if (!id || !userId) {
            res.status(400).json({ message: "id and userId are required" });
            return;
        }
        const removed = await removeMember(Number(id), Number(userId), ownerId ? Number(ownerId) : null);
        if (!removed) {
            res.status(404).json({ message: "Group not found, you are not the owner, or user is not in the group" });
            return;
        }
        res.status(200).json({ message: "Member removed from group successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

export const addContentToGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId, content } = req.body;
        if (!id || !userId || !content) {
            res.status(400).json({ message: "id, userId, and content are required" });
            return;
        }
        const added = await addContent(Number(id), Number(userId), content);
        if (!added) {
            res.status(403).json({ message: "You are not a member of the group" });
            return;
        }
        res.status(200).json({ message: "Content added to group successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

export const getContentFromGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!id || !userId) {
            res.status(400).json({ message: "id and userId are required" });
            return;
        }
        const content = await getContentFromModel(Number(id), Number(userId));
        if (content === null) {
            res.status(403).json({ message: "You are not a member of the group" });
            return;
        }
        res.status(200).json(content);
    } catch (error) {
        console.error("Error fetching group content:", error);
        res.status(500).json({ message: "Error", error: (error as Error).message });
    }
};