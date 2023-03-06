import { Router } from "express";
const router = Router();
import * as postController from './controller/post.controller.js';
import { auth } from './../../middleware/auth.js';
import { myMulter,HME } from "../../services/multer.js";


// create new post
router.post('/createpost',auth('createPost'),myMulter('image').any('images'),HME,postController.createPost);

// appear posts
router.get('/appearpost',auth('apperPost'),postController.appearPost);

// like
router.patch('/like/:id',auth('public'),postController.likeButton);

// unlike
router.patch('/unlike/:id',auth('public'),postController.unlikeButton);



export default router;
