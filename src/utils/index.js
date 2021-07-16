const emptyValueCheck = value => !value || (typeof value === 'string' && value.trim() === '');

export {
    emptyValueCheck,
}