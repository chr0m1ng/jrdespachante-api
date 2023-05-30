import * as yup from 'yup';

const provider_headers_schema = yup.object().shape({
    provider: yup
        .string()
        .matches(/[A-Z0-9-_]/i)
        .required(),
    provider_id: yup
        .string()
        .matches(/[A-Z0-9-_]/i)
        .required()
});

export { provider_headers_schema };
