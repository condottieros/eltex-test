const BaseAPIURL = process.env.NODE_ENV === 'production' ? 'http://api.eltex.test' : 'http://localhost:4321'
export { BaseAPIURL }