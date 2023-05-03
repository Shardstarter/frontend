const objToParamString = (params = {}) => {
    if (Object.keys(params).length === 0) return '';

    return Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

};


export default objToParamString;