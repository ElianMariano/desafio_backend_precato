import express, {Request, Response} from "express";
import MessageFlowController from "./controllers/MessageFlowController";

const routes = express.Router();

// Message flow
const messageFlow = new MessageFlowController();
routes.get('/message_flow/:id', messageFlow.index)
routes.post('/message_flow', messageFlow.create)
routes.put('/message_flow', messageFlow.update)
routes.delete('/message_flow/:id', messageFlow.delete)

export default routes;