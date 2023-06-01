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
 *       required: true
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

/**
 *  @swagger
 * /sign-in:
 *   get:
 *     tags:
 *     - "user"
 *     summary: "Sign in an user"
 *     description: "Sign in an user"
 *     parameters:
 *     - in: "header"
 *       name: "provider"
 *       type: string
 *       description: "The provider name"
 *       required: true
 *     - in: "header"
 *       name: "provider_id"
 *       type: string
 *       description: "The user provider id"
 *       required: true
 *     responses:
 *       200:
 *         description: "User found"
 */
routes.push(
    new Route(
        '/sign-in',
        constants.HTTP2_METHOD_GET,
        UserController,
        'signInAsync',
        { headers: create_user_body_schema }
    )
);

export default routes;
