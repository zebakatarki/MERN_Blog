//Where ever we waant to show the error its not from server side like example 

export const errorHandler = (statusCode, message) => {
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error;
};