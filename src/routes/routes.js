/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
import { readdirSync } from 'fs';

const ROUTES_PATH = process.env.IS_PRODUCTION
    ? 'C:\\home\\site\\wwwroot\\src\\routes'
    : 'src/routes';
const ROUTES_SUFFIX = '-routes.js';

let routes = null;

const getRoutes = () => {
    if (routes) {
        return routes;
    }

    const files = readdirSync(ROUTES_PATH);
    console.log(files);
    const routes_files = files.filter((f) => f.includes(ROUTES_SUFFIX));

    routes = routes_files.reduce((acc, routes_file) => {
        const file_path = `./${routes_file}`;
        const { default: file_routes } = require(file_path);
        return [...acc, ...file_routes];
    }, []);

    return routes;
};

export default getRoutes;
