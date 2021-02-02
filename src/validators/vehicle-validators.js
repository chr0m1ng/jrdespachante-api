/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

const plate_query_schema = yup.object().shape({
    plate: yup
        .string()
        .matches(/[A-Z]{3}\d[0-9A-Z]\d{2}/i)
        .required()
});

export { plate_query_schema };
