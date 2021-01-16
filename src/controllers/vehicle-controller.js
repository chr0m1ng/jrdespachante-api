const vehicle = require('../facades/vehicle-facade');

class VehicleController {
    static async execMethodWithPlateAuthAsync(methodAsync, req, res) {
        const { plate } = req.query;
        const method_res = await methodAsync(plate);
        return res.send(method_res);
    }

    async getVehicleRegistrationAsync(req, res) {
        return VehicleController.execMethodWithPlateAuthAsync(
            vehicle.getVehicleRegistrationBillAsync,
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

module.exports = new VehicleController();
