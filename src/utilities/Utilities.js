export const baseUrl = 'https://api.mercadolibre.com'

export const getMercadoLibreSellerIDFromToken = (token) => {
    return /[^-]*$/.exec(token)[0];
}