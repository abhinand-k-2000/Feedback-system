

export class AppError extends Error {
    status: number;

    constructor(status = 400, message: string) {
        super(message);
        this.status = status;
    }
}