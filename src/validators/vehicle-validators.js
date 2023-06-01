import * as yup from 'yup';

const plate_query_schema = yup.object().shape({
    plate: yup
        .string()
        .matches(/^[A-Z]{3}[-| ]?\d[0-9A-Z]\d{2}$/i)
        .required()
});

const registration_query_schema = plate_query_schema.shape({
    include_all_tickets: yup.boolean().notRequired()
});

export { plate_query_schema, registration_query_schema };
