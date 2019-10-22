export interface IBlog {
    id: number;
    title: string;
    text: string;
    date: string;
    author: string;
    comments?: Array<any>;
}

export interface IUser {
    id: number;
    login: string;
    email: string;
    password: string;
}
