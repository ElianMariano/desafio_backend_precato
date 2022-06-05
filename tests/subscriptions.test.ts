import request from 'supertest';
import app from '../src/app';

describe("Send subscription method", () => {
    it("Should be able to receive a subscription resource", async () => {
        let response = await request(app)
            .post('/subscription')
            .send({
                email: "email@gmail.com",
                name: "subscription name"
            });

        response = await request(app)
            .get(`/subscription/${response.body.id}`)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('subscription_date');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('last_message');
        expect(response.body).toHaveProperty('active');
    })

    it("Should be able to create a subscription resource", async () => {
        const response = await request(app)
            .post('/subscription')
            .send({
                email: "email@gmail.com",
                name: "subscription name"
            });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
    })

    it("Should be able to update a subscription resource", async () => {
        let response = await request(app)
            .post('/subscription')
            .send({
                email: "email@gmail.com",
                name: "subscription name"
            });
        
        response = await request(app)
            .put(`/subscription/${response.body.id}`)
            .send({
                email: "email@gmail.com",
                name: "subscription name updated"
            })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    })

    it("Should be able to delete a subscription resource", async () => {
        let response = await request(app)
            .post('/subscription')
            .send({
                email: "email@gmail.com",
                name: "subscription name"
            });
        
        response = await request(app)
            .delete(`/subscription/${response.body.id}`)

        expect(response.status).toBe(202);
        expect(response.body).toHaveProperty('id');
    })

    it("Should be able to maintain unique email addresses", async () => {
        let response = await request(app)
            .post('/subscription')
            .send({
                email: "email@gmail.com",
                name: "subscription name"
            });
        
        response = await request(app)
            .post('/subscription')
            .send({
                email: "email@gmail.com",
                name: "other subscription name"
            });
        
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('error');
    })

    it("Should be able to an avoid invalid email", async () => {
        const response = await request(app)
            .post('/subscription')
            .send({
                email: "invalid email",
                name: "subscription name"
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    })
})