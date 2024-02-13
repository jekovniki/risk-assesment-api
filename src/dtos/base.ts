export interface IBaseResponse {
    success: boolean;
    message: string;
}

export interface IErrorResponse extends IBaseResponse {
    code: number;
}

export interface IBaseId {
    id: number
}

export interface IUserId {
    userId: string
}
