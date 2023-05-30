import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import App from '../src/app.js';
import app_settings from '../src/appsettings.json';

const { base_path, auth_key } = app_settings.api;
const HEALTH_CHECK_PATH = `${base_path}/ping`;
const API_KEY = auth_key;

const SERVER = new App();
let EXPRESS_APP = null;

describe('Test the health check', () => {
    beforeAll(async () => {
        await SERVER.buildAsync();
        EXPRESS_APP = SERVER.app;
    });
    test('It should response with 200 the GET method', async () => {
        const response = await request(EXPRESS_APP)
            .get(HEALTH_CHECK_PATH)
            .set('X-API-KEY', API_KEY);
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.text).toBe('Pong');
    });
    afterAll(async () => {
        await SERVER.stopAppAsync();
    });
});
