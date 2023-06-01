import BaseApiController from './base-api-controller.js';

class HealthCheckController extends BaseApiController {
    ping = (_, res) => {
        return res.send('Pong');
    };
}

export default HealthCheckController;
