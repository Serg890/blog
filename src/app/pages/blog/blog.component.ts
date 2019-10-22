import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IBlog, IUser } from 'src/app/shared/interfaces/blog.interaface';
import { Blog, User } from 'src/app/shared/classes/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @ViewChild('closeModal1', { static: false }) closeModal1: ElementRef;
  @ViewChild('closeModal2', { static: false }) closeModal2: ElementRef;
  @ViewChild('closeModal3', { static: false }) closeModal3: ElementRef;

  arrBlogs: Array<IBlog> = [];
  titlePost: string;
  textPost: string;
  blogDate: string;
  blogAuthor: string;
  userLogin: string;
  userEmail: string;
  userPassword: string;
  users: Array<IUser> = [
    {
      id: 1,
      login: 'Admin',
      email: 'admin@gmail.com',
      password: '1111'
    },
    {
      id: 2,
      login: 'Serg',
      email: 'serg@gmail.com',
      password: '0000'
    }
  ];
  loginIn: string;
  passIn: string;
  check: boolean;
  check1: boolean;
  blogStatus: boolean;
  name: string;
  editIndex: number;
  userSignet: IUser;
  constructor() { }

  ngOnInit() {
  }
  addUser(): void {
    const newUser: IUser = new User(1, this.userLogin, this.userEmail, this.userPassword);
    if (this.userLogin) {
      if (this.users.length > 0) {
        newUser.id = this.users.slice(-1)[0].id + 1;
      }
    }
    this.users.push(newUser);
    this.closeModal2.nativeElement.click();
    this.clearForm();
  }

  addBlog(): void {
    this.blogDate = this.setData();
    this.blogAuthor = this.name;
    const newBlog: IBlog = new Blog(1, this.titlePost, this.textPost, this.blogDate, this.blogAuthor);
    if (this.titlePost) {
      if (this.arrBlogs.length > 0) {
        newBlog.id = this.arrBlogs.slice(-1)[0].id + 1;
      }
    }
    this.arrBlogs.push(newBlog);
    this.clearForm();
    this.closeModal.nativeElement.click();
  }

  submit(): void {
    if (!this.loginIn || !this.passIn) {
      this.check = true;
      this.check1 = false;
    } else {
      this.users.forEach((user) => {
        if (this.loginIn === user.email && this.passIn === user.password) {
          this.userSignet = user;
          this.name = user.login;
          this.blogStatus = true;
          this.clearForm();
          this.closeModal1.nativeElement.click();
        } else {
          this.check1 = true;
          this.check = false;
        }
      });
    }
  }

  singOut(): void {
    this.blogStatus = false;
    this.clearForm();
  }

  edit(i: number): void {
    this.titlePost = this.arrBlogs[i].title;
    this.textPost = this.arrBlogs[i].text;
    this.editIndex = i;
  }

  delete(index: number): void {
    this.arrBlogs.splice(index, 1);
  }

  savePost(): void {
    this.arrBlogs[this.editIndex].title = this.titlePost;
    this.arrBlogs[this.editIndex].text = this.textPost;
    this.closeModal3.nativeElement.click();
  }

  setData(): string {
    const d = new Date();
    let dd: number | string = d.getDate();
    const mm: number = d.getMonth();
    const yy: number = d.getFullYear();
    const hhh: number = d.getHours();
    let mmm: number | string = d.getMinutes();
    if (dd < 10) { dd = '0' + dd; }
    if (mmm < 10) { mmm = '0' + mmm; }
    return `${hhh}:${mmm}, ${dd}.${mm + 1}.${yy}`;
  }
  clearForm(): void {
    this.userLogin = '';
    this.userEmail = '';
    this.userPassword = '';
    this.titlePost = '';
    this.textPost = '';
    this.loginIn = '';
    this.passIn = '';
    this.check = false;
    this.check1 = false;
  }
}
