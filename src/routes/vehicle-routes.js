import { constants } from 'http2';
import Route from '../models/route.js';
import vehicleController from '../controllers/vehicle-controller.js';
import {
    plate_query_schema,
    registration_query_schema
} from '../validators/vehicle-validators.js';
import { provider_headers_schema } from '../validators/auth-validators.js';

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
 *       type: string
 *       description: "The plate to lookup"
 *       required: true
 *     - in: "query"
 *       name: "include_all_tickets"
 *       type: boolean
 *       description: "The plate to lookup"
 *       required: false
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
 *         description: "Ok"
 *       204:
 *         description: "Vehicle not found"
 *       400:
 *         description: "Bad Request"
 */
routes.push(
    new Route(
        '/vehicle/registration',
        constants.HTTP2_METHOD_GET,
        vehicleController,
        'getVehicleRegistrationAsync',
        { query: registration_query_schema, headers: provider_headers_schema }
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
 *         description: "Ok"
 *       204:
 *         description: "Vehicle not found"
 *       400:
 *         description: "Bad Request"
 */
routes.push(
    new Route(
        '/vehicle/traffic-tickets',
        constants.HTTP2_METHOD_GET,
        vehicleController,
        'getVehicleTrafficTicketsAsync',
        { query: plate_query_schema, headers: provider_headers_schema }
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
 *         description: "Ok"
 *       204:
 *         description: "Vehicle not found"
 *       400:
 *         description: "Bad Request"
 */
routes.push(
    new Route(
        '/vehicle/ipva',
        constants.HTTP2_METHOD_GET,
        vehicleController,
        'getVehicleIpvaBillAsync',
        { query: plate_query_schema, headers: provider_headers_schema }
    )
);

export default routes;
