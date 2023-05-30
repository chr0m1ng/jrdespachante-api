class VehiclePreProcessors {
    /**
     * Plate preprocessor cleanup
     * @param {string} plate
     * @returns plate
     */
    static platePreprocessor = (plate) => {
        return plate.replace('-', '').replace(' ', '').toUpperCase();
    };
}

export default VehiclePreProcessors;
