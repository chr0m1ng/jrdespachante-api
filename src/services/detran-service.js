const axios = require('axios');
const qs = require('querystring');
const {
    detran: { base_url }
} = require('../config');
const logger = require('../providers/logger-provider');

const SEARCH_METHOD = 'pesquisar';
const TOKEN_KEY = 'set-cookie';

const getVehicleAuthTokenAsync = async (plate) => {
    const url = `${base_url}/contingencia.do`;
    const params = {
        placa: plate,
        method: SEARCH_METHOD
    };

    const auth_res = await axios.post(url, qs.stringify(params));

    logger.debug(auth_res);

    return auth_res.headers[TOKEN_KEY];
};

const fetchVehicleEndpointAsync = async (endpoint, token) => {
    const url = `${base_url}/${endpoint}`;
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

module.exports = {
    getVehicleAuthTokenAsync,
    getVehicleRegistrationBillAsync,
    getVehicleIpvaBillAsync,
    getVehicleTrafficTicketsAsync
};
