const port: number = 8080;
const host: string = 'localhost';

export const config = {
    host,
    port
};

export enum StatusCode {
    BadRequest = 400,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    Created = 201,
    Ok = 200,
    NoContent = 204
}
