import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import App from '../src/app.js';
import app_settings from '../src/appsettings.json';

const SERVER = new App();
let EXPRESS_APP = null;

describe('Test the swagger path', () => {
    beforeAll(async () => {
        await SERVER.buildAsync();
        EXPRESS_APP = SERVER.app;
    });
    test('It should response with 200 the GET method', async () => {
        const response = await request(EXPRESS_APP).get(
            app_settings.api.swagger_path
        );
        expect(response.statusCode).toBe(StatusCodes.OK);
    });
    afterAll(async () => {
        await SERVER.stopAppAsync();
    });
});
