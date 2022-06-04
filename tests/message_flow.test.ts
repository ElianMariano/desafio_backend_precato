import request from 'supertest';
import app from '../src/app';

describe("Message flow", () => {
    it("Should be able to get a message", async () => {
        let response = await request(app)
            .post('/message_flow')
            .send({
                template_name: 'Template Name',
                position: '2022-07-20'
            });

        response = await request(app)
            .get(`/message_flow/${response.body.id}`)
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('template_name');
        expect(response.body).toHaveProperty('position');
    })

    it("Should be able to create a message flow", async () => {
        const response = await request(app)
            .post('/message_flow')
            .send({
                template_name: 'Template Name',
                position: '2022-07-20'
            })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('template_name');
        expect(response.body).toHaveProperty('position');
    })

    it("Should be able to update a message flow", async () => {
        let response = await request(app)
            .post('/message_flow')
            .send({
                template_name: 'Template Name',
                position: '2022-07-20'
            })

        response = await request(app)
            .put(`/message_flow/${response.body.id}`)
            .send({
                template_name: 'Template Name updated',
                position: '2022-07-23'
            })
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    })

    it("Should be able to delete a message flow", async () => {
        let response = await request(app)
            .post('/message_flow')
            .send({
                template_name: 'Template Name',
                position: '2022-07-20'
            })

        response = await request(app)
            .delete(`/message_flow/${response.body.id}`)
        
        expect(response.status).toBe(202);
        expect(response.body).toHaveProperty('id');
    })
})