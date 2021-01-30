import { constants } from 'http2';
import Route from '../models/route';
import vehicleController from '../controllers/vehicle-controller';

const routes = [];

/**
 *  @swagger
 * /vehicle/registration:
 *   get:
 *     tags:
 *     - "vehicle"
 *     summary: "Get a vehicle registration bill"
 *     description: "Get the given vehicle registration full bill"
 *     parameters:
 *     - in: "query"
 *       name: "plate"
 *       description: "The plate to lookup"
 *       required: true
 *     responses:
 *       200:
 *         description: "Ok"
 *       400:
 *         description: "Bad Request"
 */
routes.push(
    new Route(
        '/vehicle/registration',
        constants.HTTP2_METHOD_GET,
        vehicleController.getVehicleRegistrationAsync
    )
);

/**
 *  @swagger
 * /vehicle/traffic-tickets:
 *   get:
 *     tags:
 *     - "vehicle"
 *     summary: "Get a vehicle traffic tickets"
 *     description: "Get the given vehicle traffic tickets"
 *     parameters:
 *     - in: "query"
 *       name: "plate"
 *       description: "The plate to lookup"
 *       required: true
 *     responses:
 *       200:
 *         description: "Ok"
 *       400:
 *         description: "Bad Request"
 */
routes.push(
    new Route(
        '/vehicle/traffic-tickets',
        constants.HTTP2_METHOD_GET,
        vehicleController.getVehicleTrafficTicketsAsync
    )
);

/**
 *  @swagger
 * /vehicle/ipva:
 *   get:
 *     tags:
 *     - "vehicle"
 *     summary: "Get a vehicle ipva bill"
 *     description: "Get the given vehicle ipva bill"
 *     parameters:
 *     - in: "query"
 *       name: "plate"
 *       description: "The plate to lookup"
 *       required: true
 *     responses:
 *       200:
 *         description: "Ok"
 *       400:
 *         description: "Bad Request"
 */
routes.push(
    new Route(
        '/vehicle/ipva',
        constants.HTTP2_METHOD_GET,
        vehicleController.getVehicleIpvaBillAsync
    )
);

export default routes;
