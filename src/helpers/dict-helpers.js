class DictHelpers {
    /**
     * Get all key values from given dictionary
     * @param {Record<string, any>} dict
     * @param {Array<string>} keys
     * @returns {Array<string>} values
     */
    static getDictValuesFromKeys = (dict, keys) => {
        return keys.map((key) => dict[key]);
    };
}

export default DictHelpers;
