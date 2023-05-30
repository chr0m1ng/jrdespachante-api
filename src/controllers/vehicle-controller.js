// eslint-disable-next-line no-unused-vars
import { Db } from 'mongodb';
import VehicleFacade from '../facades/vehicle-facade.js';
import UserFacade from '../facades/user-facade.js';
import VehiclePreProcessors from '../preprocessors/vehicle-preprocessors.js';

class VehicleController {
    /**
     * Vehicle Controller
     * @param {Db} database
     */
    constructor(database) {
        this.database = database;
        this.user_facade = new UserFacade(database);
        this.vehicle_facade = new VehicleFacade();
    }

    execMethodWithPlateAuthAsync = async (methodAsync, req, res) => {
        const { provider, provider_id } = req.headers;

        const { plate } = req.query;
        const clean_plate = VehiclePreProcessors.platePreprocessor(plate);

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
