class HealthCheckController {
    ping = (_, res) => {
        return res.send('Pong');
    };
}

export default HealthCheckController;
