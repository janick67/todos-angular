export class Todo {
  id:number;
  title:string;
  description:string;
  creatUser:number;
  doneUser:number;
  deletedUser:number;
  comments:[];
  done:boolean;
  deleted:boolean;
  createTime:Date;
  doneTime:Date;
  deletedTime:Date;
}