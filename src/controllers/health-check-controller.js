class HealthCheckController {
    ping(_, res) {
        return res.send('Pong');
    }
}

module.exports = new HealthCheckController();
