import { Router } from "express";

import {
  prompt,
  conversationAll,
  messageAll,
} from "../../Controllers/Public/ChatController";

const router = Router();

router.route("/prompt").post(prompt);
router.route("/conversation-all").post(conversationAll);
router.route("/message-all").post(messageAll);

export default router;
