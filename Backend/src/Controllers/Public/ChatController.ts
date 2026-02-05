import { StatusCode } from "../../Constants/Constant";
import ChatService from "../../Services/ChatService";

export async function prompt(req: any, res: any) {
  try {
    const data = await ChatService.prompt(req);
    res.json(data);
    } catch (err: any) {
    console.log(`prompt err: ${err.message}`);
    res.status(500).json({
      status: StatusCode.FAIL,
      message: err.message,
      data: {}
    });
  }
}

export async function conversationAll(req: any, res: any) {
  try {
    const data = await ChatService.conversationAll(req);
    res.json(data);
  } catch (err: any) {
    console.log(`conversationAll err: ${err.message}`);
    res.status(500).json({
      status: StatusCode.FAIL,
      message: err.message,
      data: {}
    });
  }
}

export async function messageAll(req: any, res: any) {
  try {
    const data = await ChatService.messageAll(req);
    res.json(data);
  } catch (err: any) {
    console.log(`messageAll err: ${err.message}`);
    res.status(500).json({
      status: StatusCode.FAIL,
      message: err.message,
      data: {}
    });
  }
}
