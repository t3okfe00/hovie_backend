import { Router } from "express";
import { getGroups, createGroup, deleteGroup, getGroup, joinGroup, addMemberToGroup, removeMemberFromGroup, addContentToGroup, getContentFromGroup } from "../controller/groupController";

const router = Router();

router.get("/groups", getGroups);
router.get("/groups/:id", getGroup);
router.get("/groups/:id/content", getContentFromGroup);
router.post("/groups/:id/join", joinGroup);
router.post("/groups/:id/members", addMemberToGroup);
router.post("/groups", createGroup);//add member to member table
router.delete("/groups/:id", deleteGroup);//remove member from member table
router.delete("/groups/:id/members/:userId", removeMemberFromGroup);//no member in member table
router.post("/groups/:id/content", addContentToGroup);

export default router;