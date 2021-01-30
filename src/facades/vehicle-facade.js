import { JSDOM } from 'jsdom';
import * as detran from '../services/detran-service';

const NAME_QS = 'td .grid_interno';
const VALUE_QS = 'td .grid_interno2';
const OWNER_QS = '.texto_diferente';
const REGISTRATION_QS = '.titulo2';

const RENAVAM_INDEX = 2;
const CITY_INDEX = 6;
const STATE_INDEX = 8;

const getVehicleAuthTokenAsync = (plate) =>
    detran.getVehicleAuthTokenAsync(plate);

const clearDataName = (data) =>
    data
        .replace('\n', '')
        .replace(/[ ]{2}/g, '')
        .replace(':', '')
        .replace(/\( /g, '(')
        .replace(/ \)/g, ')');

const getVehicleRegistrationData = (document) => {
    const owner = document.querySelector(OWNER_QS).textContent;
    const registration_data = document.querySelectorAll(REGISTRATION_QS);

    return {
        name: owner,
        renavam: registration_data[RENAVAM_INDEX].textContent,
        city: registration_data[CITY_INDEX].textContent,
        state: registration_data[STATE_INDEX].textContent
    };
};

const getVehicleSearchDataTable = (document) => {
    const names = document.querySelectorAll(NAME_QS);
    const values = document.querySelectorAll(VALUE_QS);

    const data = {};
    names.forEach((n, i) => {
        data[clearDataName(n.textContent)] = values[i].textContent;
    });

    return data;
};

const fetchVehicleDataAsync = async (plate, methodAsync) => {
    const token = await getVehicleAuthTokenAsync(plate);
    const html_res = await methodAsync(token);
    const {
        window: { document }
    } = new JSDOM(html_res);

    const data = await getVehicleSearchDataTable(document);
    const vehicle = getVehicleRegistrationData(document);
    vehicle.plate = plate.toUpperCase();

    return {
        vehicle,
        data
    };
};

const getVehicleRegistrationBillAsync = async (plate) =>
    fetchVehicleDataAsync(plate, detran.getVehicleRegistrationBillAsync);

const getVehicleTrafficTicketsAsync = async (plate) =>
    fetchVehicleDataAsync(plate, detran.getVehicleTrafficTicketsAsync);

const getVehicleIpvaBillAsync = async (plate) =>
    fetchVehicleDataAsync(plate, detran.getVehicleIpvaBillAsync);

export {
    getVehicleRegistrationBillAsync,
    getVehicleTrafficTicketsAsync,
    getVehicleIpvaBillAsync
};
