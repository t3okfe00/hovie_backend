import { Request, Response } from "express-serve-static-core";
import { getAllGroups } from "../model/groupModel";

export const getGroups = async (req: Request, res: Response) => {
    try {
        const groups = await getAllGroups();
        res.json(groups);
    } catch (error) {
        res.json({ message: "Error" });
    }
};