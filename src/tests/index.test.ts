import request from 'supertest';
import { app } from '../server';

describe('Test my server', () => {
    it('should return a 200 response', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1');
        expect(response.status).toBe(200);
    });

    it('should return a welcome message', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1');
        expect(response.text).toBe('Welcome to the API');
    });
});
