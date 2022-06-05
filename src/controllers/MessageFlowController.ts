import connection from '../database/connection';
import {Request, Response} from 'express';

class MessageFlowController{
    async index(request: Request, response: Response){
        console.log("index")
        const {id} = request.params;

        const data = await connection('message_flow').where({id}).select('*').first();

        return response.status(200).json(data);
    }

    async create(request: Request, response: Response){
        const {template_name, position} = request.body;

        const [id] = await connection('message_flow').insert({
            template_name,
            position
        }, 'id');

        return response.status(201).json({id});
    }

    async update(request: Request, response: Response){

    }

    async delete(request: Request, response: Response){
        const {id} = request.params;

        await connection('message_flow').where({id}).delete();

        return response.status(202).json({id});
    }
}

export default MessageFlowController;