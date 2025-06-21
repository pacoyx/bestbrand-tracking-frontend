export interface ILoginRequest {
    username: string;
    password: string;
}


export interface ILoginResponse {
    success: boolean;
    message: string;
    data: ILoginResponseData;
    errors: any[];
}

interface ILoginResponseData {
    token: string;
    role: string;
}