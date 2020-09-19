import {Comment} from './Comment'

export class Todo {
  _id:string;
  title:string;
  description:string;
  creatUser:number;
  doneUser:number;
  deletedUser:number;
  comments:Comment[];
  done:boolean;
  deleted:boolean;
  createTime:Date;
  doneTime:Date;
  deletedTime:Date;
}