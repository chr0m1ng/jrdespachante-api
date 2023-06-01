import * as yup from 'yup';

const create_user_body_schema = yup.object().shape({
    provider: yup
        .string()
        .matches(/[A-Z0-9-_]/i)
        .required(),
    provider_id: yup
        .string()
        .matches(/[A-Z0-9-_]/i)
        .required()
});

export { create_user_body_schema };
