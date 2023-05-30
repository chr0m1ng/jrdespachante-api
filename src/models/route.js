class Route {
    /**
     * Route
     * @param {string} path
     * @param {string} method
     * @param {class} controller
     * @param {string} controller_method
     * @param {CallableFunction} validator
     * @param {CallableFunction} middlewares
     */
    constructor(
        path,
        method,
        controller,
        controller_method,
        validator = null,
        middlewares = []
    ) {
        this.path = path;
        this.method = method.toLowerCase();
        this.controller = controller;
        this.controller_method = controller_method;
        this.validator = validator;
        this.middlewares = middlewares;
    }
}

export default Route;
