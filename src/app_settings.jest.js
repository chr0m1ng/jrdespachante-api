const app_settings = {
    seq: {
        server_url: null,
        api_key: null
    },
    api: {
        base_path: '/api/v1',
        swagger_path: '/',
        auth_key: 'dev'
    },
    database: {
        mongo: {
            connection_string: global.__MONGO_URI__,
            database: 'cooper-s'
        }
    },
    detran: {
        base_url: 'http://licenciamento.ba.gov.br/sli'
    }
};

export default app_settings;
