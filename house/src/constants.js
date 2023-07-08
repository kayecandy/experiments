export const randomProperty = function (obj) {
    const keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
};
