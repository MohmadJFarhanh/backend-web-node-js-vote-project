
import { Router } from "express";
import * as commentController from './controller/comment.controller.js';
import { auth } from './../../middleware/auth.js';
const router = Router()

// create comment
router.post('/createcomment/:postId',auth(),commentController.createComment);

                     
export default router