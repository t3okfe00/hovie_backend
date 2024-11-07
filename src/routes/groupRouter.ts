import { Router, Request, Response } from "express";
import { getGroups, createGroup, deleteGroup, getGroup, joinGroup, addMemberToGroup, removeMemberFromGroup, addContentToGroup, getContentFromGroup } from "../controller/groupController";
import {create} from "node:domain";
const router = Router();

router.get("/groups", getGroups);
router.get("/groups/:id", getGroup);
router.get("/groups/:id/content", getContentFromGroup);
router.post("/groups/:id/join", joinGroup);
router.post("/groups/:id/members", addMemberToGroup);
router.post("/groups", (req: Request, res: Response) => {
    createGroup(req, res).catch(error => {
        res.status(500).json({ message: "Error" });
    });
});
router.delete("/groups/:id", (req: Request, res: Response) => {
    deleteGroup(req, res).catch(error => {
        res.status(500).json({ message: "Error" });
    });
});
router.delete("/groups/:id/members/:userId", (req: Request, res: Response) => {
    removeMemberFromGroup(req, res).catch(error => {
        res.status(500).json({ message: "Error" });
    });
});
router.post("/groups/:id/content", (req: Request, res: Response) => {
    addContentToGroup(req, res).catch(error => {
        res.status(500).json({ message: "Error" });
    });
});

export default router;