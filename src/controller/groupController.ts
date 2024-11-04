import { Request, Response } from "express-serve-static-core";
import {getAllGroups, postGroup} from "../model/groupModel";

export const getGroup = async (req: Request, res: Response) => {
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