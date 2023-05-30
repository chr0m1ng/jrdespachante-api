import axios from 'axios';
import qs from 'querystring';
import app_settings from '../appsettings.json' assert { type: 'json' };
import { NoContentError } from '../models/errors/index.js';

const { detran } = app_settings;

const SEARCH_METHOD = 'pesquisar';
const TOKEN_KEY = 'set-cookie';
const BASE_URL = detran.base_url;
const INVALID_VEHICLE_MARK = 'Ve�culo n�o encontrado';

class DetranService {
    /**
     * Get token auth for plate search
     * @param {string} plate
     * @returns {Promise<string>} token
     */
    getVehicleAuthTokenAsync = async (plate) => {
        const url = `${BASE_URL}/contingencia.do`;
        const params = {
            placa: plate,
            method: SEARCH_METHOD
        };

        const auth_res = await axios.post(url, qs.stringify(params));

        if (auth_res.data.includes(INVALID_VEHICLE_MARK)) {
            throw new NoContentError('Vehicle not found');
        }

        return auth_res.headers[TOKEN_KEY];
    };

    /**
     * Fetch endpoint and return Vehicle Data from it
     * @param {string} endpoint
     * @param {string} token
     * @returns {Promise<Record<string, string>>} VehicleData
     */
    fetchVehicleEndpointAsync = async (endpoint, token) => {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {
            Cookie: token
        };
        const detran_res = await axios.get(url, {
            params: { method: SEARCH_METHOD },
            headers,
            withCredentials: true
        });

        return detran_res.data;
    };

    /**
     * Get vehicle IPVA, license and traffic tickets
     * @param {string} token
     * @returns {Promise<Record<string, string>>} VehicleData
     */
    getVehicleRegistrationBillAsync = async (token) => {
        return this.fetchVehicleEndpointAsync(
            'licenciamentoCotaUnicaAtual.do',
            token
        );
    };

    /**
     * Get vehicle IPVA
     * @param {string} token
     * @returns {Promise<Record<string, string>>} VehicleData
     */
    getVehicleIpvaBillAsync = (token) => {
        return this.fetchVehicleEndpointAsync('ipvaCotaUnicaAtual.do', token);
    };

    /**
     * Get vehicle traffic tickets
     * @param {string} token
     * @returns {Promise<Record<string, string>>} VehicleData
     */
    getVehicleTrafficTicketsAsync = (token) => {
        return this.fetchVehicleEndpointAsync(
            'multasObrigatoriasOpcionais.do',
            token
        );
    };
}

export default DetranService;
