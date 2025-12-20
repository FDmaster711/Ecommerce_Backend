 export const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Cambia espacios por guiones
        .replace(/[^\w-]+/g, '')  // Quita caracteres especiales
        .replace(/--+/g, '-');    // Quita guiones dobles
};