// eslint-disable-next-line no-unused-vars
import { Db } from 'mongodb';
import VehicleFacade from '../facades/vehicle-facade.js';
import UserFacade from '../facades/user-facade.js';
import VehiclePreProcessors from '../preprocessors/vehicle-preprocessors.js';
import BaseApiController from './base-api-controller.js';
import buildProviderAuthMiddleware from '../middlewares/provider-auth-middleware.js';
import { provider_headers_schema } from '../validators/auth-validators.js';

class VehicleController extends BaseApiController {
    /**
     * Vehicle Controller
     * @param {Db} database
     */
    constructor(database) {
        super();
        this.database = database;
        this.user_facade = new UserFacade(database);
        this.vehicle_facade = new VehicleFacade();
    }

    get middlewares() {
        return [buildProviderAuthMiddleware(this.database)];
    }

    get validator() {
        return { headers: provider_headers_schema };
    }

    execMethodWithPlateAuthAsync = async (methodAsync, req, res) => {
        const { provider, provider_id } = req.headers;

        const { plate } = req.query;
        const clean_plate = VehiclePreProcessors.clearPlate(plate);

        await this.user_facade.addUserPlateHistoryAsync(
            provider,
            provider_id,
            plate
        );

        const method_res = await methodAsync(clean_plate);
        return res.send(method_res);
    };

    getVehicleRegistrationAsync = async (req, res) => {
        const { include_all_tickets } = req.query;
        const should_include_all_tickets = include_all_tickets
            ? JSON.parse(include_all_tickets.toLowerCase())
            : false;
        return this.execMethodWithPlateAuthAsync(
            (plate) =>
                this.vehicle_facade.getVehicleRegistrationBillAsync(
                    plate,
                    should_include_all_tickets
                ),
            req,
            res
        );
    };

    getVehicleTrafficTicketsAsync = async (req, res) => {
        return this.execMethodWithPlateAuthAsync(
            this.vehicle_facade.getVehicleTrafficTicketsAsync,
            req,
            res
        );
    };

    getVehicleIpvaBillAsync = async (req, res) => {
        return this.execMethodWithPlateAuthAsync(
            this.vehicle_facade.getVehicleIpvaBillAsync,
            req,
            res
        );
    };
}

export default VehicleController;
