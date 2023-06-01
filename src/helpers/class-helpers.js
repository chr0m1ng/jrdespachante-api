const CONSTRUCTOR_LOOKUP_REGEX = /(?<=constructor\()(.*?)(?=\))/gim;

class ClassHelpers {
    /**
     * Get class constructor parameters
     * @param {class} klass
     * @returns {Array<string>} parameters
     */
    static getClassConstructorParameters = (klass) => {
        const class_text = `${klass}`.replace(/\s/g, '');
        const arguments_text = class_text.match(CONSTRUCTOR_LOOKUP_REGEX);
        if (
            !arguments_text ||
            (arguments_text.length === 1 && arguments_text[0] === '')
        ) {
            return [];
        }
        return arguments_text.pop().split(',');
    };
}

export default ClassHelpers;
