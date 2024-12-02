import { Router, Request } from "express";
import multer, { StorageEngine } from "multer";
import crypto from "crypto";
import path from "path";
import {
  getGroups,
  createGroup,
  deleteGroup,
  getGroup,
  joinGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  addContentToGroup,
  getContentFromGroup,
  getFeaturedGroups, getPopularGroups,
  getYourGroups,
  searchGroups,
  getAllMembers, getAllJoinRequests,
  declineJoinRequest
} from "../controller/groupController";

const router = Router();



// Configure multer for file uploads
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file, cb) => {
    const hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${hash}${ext}`);
  }
});

const upload = multer({ storage });

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
router.get("/", getGroups);

/**
 * @swagger
 * /groups/featured:
 *   post:
 *     summary: Get featured groups
 *     description: Retrieve a list of featured groups
 *     responses:
 *       200:
 *         description: Successfully retrieved featured groups
 */
router.post("/featured", getFeaturedGroups);

/**
 * @swagger
 * /groups/popular:
 *   post:
 *     summary: Get popular groups
 *     description: Retrieve a list of popular groups
 *     responses:
 *       200:
 *         description: Successfully retrieved popular groups
 */
router.post("/popular", getPopularGroups);

/**
 * @swagger
 * /groups/yourGroups:
 *   post:
 *     summary: Get your groups
 *     description: Retrieve a list of groups that the user is a member of
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 description: The ID of the user
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved your groups
 *       400:
 *         description: userId is required
 *       500:
 *         description: Error fetching your groups
 */
router.post('/yourGroups', getYourGroups);

/**
 * @swagger
 * /groups/search:
 *   get:
 *     summary: Search groups by name
 *     description: Retrieve a list of groups that match the search query
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: The name of the group to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved matching groups
 *       400:
 *         description: Name query parameter is required
 *       500:
 *         description: Error searching for groups
 */
router.get("/search", searchGroups);

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
router.get("/:id", getGroup);

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
router.post("/:id/content", addContentToGroup);

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
router.post("/:id/contents", getContentFromGroup);

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
router.post("/:id/join", joinGroup);

/**
 * @swagger
 * /groups/{id}/members:
 *   get:
 *     summary: Get all members of a group
 *     description: Retrieve a list of all members of a specific group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved members
 *       404:
 *         description: Group not found
 *       500:
 *         description: Error fetching members
 */
router.post("/:id/members", getAllMembers);

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
router.post("/:id/addmembers", addMemberToGroup);

/**
 * @swagger
 * /groups/{id}/declineJoinRequest:
 *   post:
 *     summary: Decline a join request for a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The group ID
 *       - in: body
 *         name: body
 *         required: true
 *         description: The user ID and owner ID
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *             - ownerId
 *           properties:
 *             userId:
 *               type: integer
 *               description: The ID of the user whose join request is being declined
 *             ownerId:
 *               type: integer
 *               description: The ID of the owner of the group
 *     responses:
 *       200:
 *         description: Join request declined successfully
 *       400:
 *         description: id, userId, and ownerId are required
 *       404:
 *         description: Group not found or you are not the owner, or join request not found or already processed
 *       500:
 *         description: Error declining join request
 */
router.post('/:id/declineJoinRequest', declineJoinRequest);

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     description: Create a new group with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the group
 *                 example: Example Group
 *               ownersId:
 *                 type: number
 *                 description: The ID of the owner
 *                 example: 9
 *               category:
 *                 type: string
 *                 description: The category of the group
 *                 example: Sports
 *               description:
 *                 type: string
 *                 description: The description of the group
 *                 example: This is an example group description.
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Group successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/", upload.single('image'), createGroup);

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
router.delete("/:id", deleteGroup);

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
router.delete("/:id/members/:userId", removeMemberFromGroup);



/**
 * @swagger
 * /groups/{groupId}/joinrequests:
 *   get:
 *     summary: Get all join requests for a group
 *     description: Retrieve a list of all join requests for a specific group by ID
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved join requests
 *       404:
 *         description: No join requests found for this group
 *       500:
 *         description: Error fetching join requests
 */
router.post("/:id/joinrequests", getAllJoinRequests);

export default router;