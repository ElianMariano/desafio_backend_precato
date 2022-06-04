import express, {Request, Response} from "express";

const routes = express.Router();

routes.get('/', (request: Request, response: Response) => {
    return response.send("Hello World");
})

export default routes;