import { Router } from "express";
import { sendNotification } from "../services/notificationService";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const body = req.body as { to?: string; subject?: string; text?: string };
    const result = await sendNotification({
      to: body.to ?? "",
      subject: body.subject ?? "",
      text: body.text ?? "",
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default router;
