/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
import { readdirSync } from 'fs';

const ROUTES_PATH = 'src/routes';
const ROUTES_SUFFIX = '-routes.js';

let routes = null;

const getRoutesAsync = async () => {
    if (routes) {
        return routes;
    }

    const files = readdirSync(ROUTES_PATH);
    const routes_files = files.filter((f) => f.includes(ROUTES_SUFFIX));

    routes = await routes_files.reduce(async (acc, routes_file) => {
        const file_path = `./${routes_file}`;
        const { default: file_routes } = await import(file_path);
        return [...(await acc), ...file_routes];
    }, []);

    return routes;
};

export default getRoutesAsync;
