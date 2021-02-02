import axios from 'axios';
import qs from 'querystring';
import { detran } from '../appsettings.json';
import { NoContentError } from '../models/errors';

const SEARCH_METHOD = 'pesquisar';
const TOKEN_KEY = 'set-cookie';
const BASE_URL = detran.base_url;
const INVALID_VEHICLE_MARK = 'Ve�culo n�o encontrado';

const getVehicleAuthTokenAsync = async (plate) => {
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

const fetchVehicleEndpointAsync = async (endpoint, token) => {
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

const getVehicleRegistrationBillAsync = (token) =>
    fetchVehicleEndpointAsync('licenciamentoCotaUnicaAtual.do', token);

const getVehicleIpvaBillAsync = (token) =>
    fetchVehicleEndpointAsync('ipvaCotaUnicaAtual.do', token);

const getVehicleTrafficTicketsAsync = (token) =>
    fetchVehicleEndpointAsync('multasObrigatoriasOpcionais.do', token);

export {
    getVehicleAuthTokenAsync,
    getVehicleRegistrationBillAsync,
    getVehicleIpvaBillAsync,
    getVehicleTrafficTicketsAsync
};
