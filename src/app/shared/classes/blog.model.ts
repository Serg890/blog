import { IBlog, IUser } from '../interfaces/blog.interaface';

export class Blog implements IBlog {
    constructor(
        public id: number,
        public title: string,
        public text: string,
        public date: string,
        public author: string,
        public comments?: Array<any>
    ) { }
}

export class User implements IUser {
  constructor(
    public id: number,
    public login: string,
    public email: string,
    public password: string
  ) { }
}
