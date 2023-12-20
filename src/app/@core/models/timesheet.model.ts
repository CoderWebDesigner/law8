export interface TimeSheetInterface{
  Date:Date,
  Matter:string
}
export class TimeSheet implements TimeSheetInterface {
  Date: Date;
  Matter: string="";
  ClientName:string="";
  Lawyer:string="";
  Task:string="";
  Hours:number=0;
  Rate:number=0;
  Amount:number=0;
  Explanation:string="";
  Notes:string="";
  constructor(Date: Date) {
    this.Date = Date;
  }

}
