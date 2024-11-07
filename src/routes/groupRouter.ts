import { Router } from "express";
import { getGroups, createGroup, deleteGroup, getGroup, joinGroup, addMemberToGroup, removeMemberFromGroup, addContentToGroup, getContentFromGroup } from "../controller/groupController";

const router = Router();

router.get("/groups", getGroups);
router.get("/groups/:id", getGroup);
router.get("/groups/:id/content", getContentFromGroup);
router.post("/groups/:id/join", joinGroup);
router.post("/groups/:id/members", addMemberToGroup);
router.post("/groups", createGroup);
router.delete("/groups/:id", deleteGroup);
router.delete("/groups/:id/members/:userId", removeMemberFromGroup);
router.post("/groups/:id/content", addContentToGroup);
router.post("/groups", createGroup);

export default router;