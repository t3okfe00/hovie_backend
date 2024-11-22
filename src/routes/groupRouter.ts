// import { Router } from "express";
// import { getGroups, createGroup, deleteGroup, getGroup, joinGroup, addMemberToGroup, removeMemberFromGroup, addContentToGroup, getContentFromGroup } from "../controller/groupController";

// const router = Router();

// router.get("/groups", getGroups);
// router.get("/groups/:id", getGroup);
// router.get("/groups/:id/content", getContentFromGroup);
// router.post("/groups/:id/join", joinGroup);
// router.post("/groups/:id/members", addMemberToGroup);
// router.post("/groups", createGroup);
// router.delete("/groups/:id", deleteGroup);
// router.delete("/groups/:id/members/:userId", removeMemberFromGroup);
// router.post("/groups/:id/content", addContentToGroup);

// export default router;


// routes/groupRoutes.js
import { Router } from "express";
import { 
  getGroups, 
  createGroup, 
  deleteGroup, 
  getGroup, 
  joinGroup, 
  addMemberToGroup, 
  removeMemberFromGroup, 
  addContentToGroup, 
  getContentFromGroup 
} from "../controller/groupController";

const router = Router();

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get all groups
 *     description: Retrieve a list of all groups
 *     responses:
 *       200:
 *         description: Successfully retrieved groups
 */
router.get("/groups", getGroups);

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Get a specific group
 *     description: Retrieve information for a specific group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved group details
 *       404:
 *         description: Group not found
 */
router.get("/groups/:id", getGroup);

/**
 * @swagger
 * /groups/{id}/content:
 *   get:
 *     summary: Get content from a group
 *     description: Retrieve content from a specific group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved content
 *       404:
 *         description: Group or content not found
 */
router.get("/groups/:id/content", getContentFromGroup);

/**
 * @swagger
 * /groups/{id}/join:
 *   post:
 *     summary: Join a group
 *     description: Join a specific group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully joined the group
 *       404:
 *         description: Group not found
 */
router.post("/groups/:id/join", joinGroup);

/**
 * @swagger
 * /groups/{id}/members:
 *   post:
 *     summary: Add a member to a group
 *     description: Add a new member to a specific group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Member successfully added to the group
 *       404:
 *         description: Group not found
 */
router.post("/groups/:id/members", addMemberToGroup);

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     description: Create a new group with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/groups", createGroup);

/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     summary: Delete a group
 *     description: Delete a specific group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group successfully deleted
 *       404:
 *         description: Group not found
 */
router.delete("/groups/:id", deleteGroup);

/**
 * @swagger
 * /groups/{id}/members/{userId}:
 *   delete:
 *     summary: Remove a member from a group
 *     description: Remove a specific member from a group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member successfully removed from the group
 *       404:
 *         description: Group or user not found
 */
router.delete("/groups/:id/members/:userId", removeMemberFromGroup);

/**
 * @swagger
 * /groups/{id}/content:
 *   post:
 *     summary: Add content to a group
 *     description: Add new content to a specific group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Content successfully added to the group
 *       404:
 *         description: Group not found
 */
router.post("/groups/:id/content", addContentToGroup);

export default router;
