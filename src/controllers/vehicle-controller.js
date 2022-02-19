import * as vehicle from '../facades/vehicle-facade';
import { platePreprocessor } from '../preprocessors/vehicle-preprocessors';

class VehicleController {
    static async execMethodWithPlateAuthAsync(methodAsync, req, res) {
        const { plate } = req.query;
        const clean_plate = platePreprocessor(plate);
        const method_res = await methodAsync(clean_plate);
        return res.send(method_res);
    }

    async getVehicleRegistrationAsync(req, res) {
        const { include_all_tickets } = req.query;
        const should_include_all_tickets = include_all_tickets
            ? JSON.parse(include_all_tickets.toLowerCase())
            : false;
        return VehicleController.execMethodWithPlateAuthAsync(
            (plate) =>
                vehicle.getVehicleRegistrationBillAsync(
                    plate,
                    should_include_all_tickets
                ),
            req,
            res
        );
    }

    async getVehicleTrafficTicketsAsync(req, res) {
        return VehicleController.execMethodWithPlateAuthAsync(
            vehicle.getVehicleTrafficTicketsAsync,
            req,
            res
        );
    }

    async getVehicleIpvaBillAsync(req, res) {
        return VehicleController.execMethodWithPlateAuthAsync(
            vehicle.getVehicleIpvaBillAsync,
            req,
            res
        );
    }
}

export default new VehicleController();
