import mung from 'express-mung';

const addBodyToRes = (body, _, res) => {
    res.body = body;
    return body;
};

export default mung.json(addBodyToRes);
