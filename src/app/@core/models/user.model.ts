export interface User {
  // userName?:string;
  // initial?:string;
  // Role?: string;
  // UserId?: string;
  // spId?: number;
  // UserName?: string;
  // ProfilePic?: any;
  // ProfilePicPath?: any;
  // Gender?: any;
  // IsSucess?: boolean;
  // MessageLog?: any;
  // FirstName?: any;
  // LastName?: any;
  // mobileNo?: any;
  // email?: any;
  // Fax?: any;
  // Website?: any;
  // VatNumber?: any;
  // Initials?: any;
  // Department?: any;
  // Title?: any;
  // lstBillToAddress?: any;
  // lstShipToAddress?: any;
  // lstContactPerson?: any;
  // lstAttach?: any;
  // Photo?:any
  // roles?:any;
  // initials?:any;
  // title?:any;
  // department?:any;
  // fax?:any;
  id?: string;
  nameEn?: string;
  nameAr?: string;
  initial?: string;
  telNo?: string;
  mobileNo?: string;
  email?: string;
  fileName?: string;
  filePath?: string;
  logoFile?: string;
  department?: string;
  title?: string;
  userName?: string;
  defUsrId?: string;
  defUsr?: string;
  role?:string[];
  TimeSheetDate?:string;
  Photo?:string;
  permissions?:string[]
}
