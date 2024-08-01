function toCamelCase(str) {
    return str.replace(/_./g, match => match.charAt(1).toUpperCase());
}

function convertKeysToCamelCase(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(convertKeysToCamelCase);
    }

    return Object.keys(obj).reduce((acc, key) => {
        const camelCaseKey = toCamelCase(key);
        acc[camelCaseKey] = convertKeysToCamelCase(obj[key]);
        return acc;
    }, {});
}

// Example usage
const snakeCaseObject = {
    first_name: 'John',
    last_name: 'Doe',
    address_details: {
        street_address: '123 Main St',
        city_name: 'Anytown'
    }
};

const camelCaseObject = convertKeysToCamelCase(snakeCaseObject);
console.log(camelCaseObject);

