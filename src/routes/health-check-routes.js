const { constants } = require('http2');
const Route = require('../models/route');
const healthCheckController = require('../controllers/health-check-controller');

const routes = [];

/**
 *  @swagger
 * /ping:
 *   get:
 *     tags:
 *     - "ping"
 *     summary: "Ping"
 *     description: "Check if api is up"
 *     responses:
 *       200:
 *         description: "Ok"
 */
routes.push(
    new Route('/ping', constants.HTTP2_METHOD_GET, healthCheckController.ping)
);

module.exports = routes;
