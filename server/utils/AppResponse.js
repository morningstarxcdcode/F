class AppResponse {
    constructor(success = true, statusCode = 200) {
        this.success = success;
        this.statusCode = statusCode;
        this.timestamp = new Date().toISOString();
    }

    static success(data = null, message = 'Success', statusCode = 200) {
        const response = new AppResponse(true, statusCode);
        if (data) response.data = data;
        if (message) response.message = message;
        return response;
    }

    static error(message = 'Error occurred', statusCode = 500, errors = null) {
        const response = new AppResponse(false, statusCode);
        response.message = message;
        if (errors) response.errors = errors;
        return response;
    }

    static validation(errors) {
        const response = new AppResponse(false, 422);
        response.message = 'Validation failed';
        response.errors = errors;
        return response;
    }

    static notFound(message = 'Resource not found') {
        return AppResponse.error(message, 404);
    }

    static unauthorized(message = 'Unauthorized access') {
        return AppResponse.error(message, 401);
    }

    static forbidden(message = 'Forbidden access') {
        return AppResponse.error(message, 403);
    }

    send(res) {
        return res.status(this.statusCode).json(this);
    }
}

module.exports = AppResponse;
