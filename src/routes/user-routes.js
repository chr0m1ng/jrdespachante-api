import { constants } from 'http2';
import Route from '../models/route.js';
import UserController from '../controllers/user-controller.js';
import { create_user_body_schema } from '../validators/user-validators.js';

const routes = [];

/**
 *  @swagger
 * /sign-up:
 *   post:
 *     tags:
 *     - "user"
 *     summary: "Sign up a new user"
 *     description: "Sign up a new user"
 *     requestBody:
 *       description: "Create a new user"
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - provider
 *               - provider_id
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *                 example: telegram
 *               provider_id:
 *                 type: string
 *                 example: abc1234
 *     responses:
 *       201:
 *         description: "User created"
 */
routes.push(
    new Route(
        '/sign-up',
        constants.HTTP2_METHOD_POST,
        UserController,
        'signUpAsync',
        { body: create_user_body_schema }
    )
);

export default routes;
