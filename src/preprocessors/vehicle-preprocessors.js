const platePreprocessor = (plate) =>
    plate
        .replace('-', '')
        .replace(' ', '')
        .toUpperCase();

// eslint-disable-next-line import/prefer-default-export
export { platePreprocessor };
