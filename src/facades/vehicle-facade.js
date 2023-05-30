import { JSDOM } from 'jsdom';
import DetranService from '../services/detran-service.js';

const NAME_QS = 'td .grid_interno';
const VALUE_QS = 'td .grid_interno2';
const OWNER_QS = '.texto_diferente';
const REGISTRATION_QS = '.titulo2';

const RENAVAM_INDEX = 2;
const CITY_INDEX = 6;
const STATE_INDEX = 8;

class VehicleFacade {
    constructor() {
        this.detran_service = new DetranService();
    }

    getVehicleAuthTokenAsync = async (plate) => {
        return this.detran_service.getVehicleAuthTokenAsync(plate);
    };

    clearDataName = (data) => {
        return data
            .replace('\n', '')
            .replace(/[ ]{2}/g, '')
            .replace(':', '')
            .replace(/\( /g, '(')
            .replace(/ \)/g, ')');
    };

    getVehicleRegistrationData = (document) => {
        const owner = document.querySelector(OWNER_QS).textContent;
        const registration_data = document.querySelectorAll(REGISTRATION_QS);

        return {
            name: owner,
            renavam: registration_data[RENAVAM_INDEX].textContent,
            city: registration_data[CITY_INDEX].textContent,
            state: registration_data[STATE_INDEX].textContent
        };
    };

    getVehicleSearchDataTable = (document) => {
        const names = document.querySelectorAll(NAME_QS);
        const values = document.querySelectorAll(VALUE_QS);

        const data = {};
        names.forEach((n, i) => {
            data[this.clearDataName(n.textContent)] = values[i].textContent;
        });

        return data;
    };

    fetchVehicleDataAsync = async (plate, methodAsync) => {
        const token = await this.getVehicleAuthTokenAsync(plate);
        const html_res = await methodAsync(token);
        const {
            window: { document }
        } = new JSDOM(html_res);

        const data = this.getVehicleSearchDataTable(document);
        const vehicle = this.getVehicleRegistrationData(document);
        vehicle.plate = plate.toUpperCase();

        return {
            vehicle,
            data
        };
    };

    getVehicleTrafficTicketsAsync = async (plate) => {
        return this.fetchVehicleDataAsync(
            plate,
            this.detran_service.getVehicleTrafficTicketsAsync
        );
    };

    getVehicleRegistrationBillAsync = async (plate, include_all_tickets) => {
        const registration_bill = await this.fetchVehicleDataAsync(
            plate,
            this.detran_service.getVehicleRegistrationBillAsync
        );

        let tickets = {};
        if (include_all_tickets) {
            const { data } = await this.getVehicleTrafficTicketsAsync(plate);
            tickets = data;
        }
        registration_bill.data = { ...tickets, ...registration_bill.data };
        return registration_bill;
    };

    getVehicleIpvaBillAsync = async (plate) => {
        return this.fetchVehicleDataAsync(
            plate,
            this.detran_service.getVehicleIpvaBillAsync
        );
    };
}

export default VehicleFacade;
