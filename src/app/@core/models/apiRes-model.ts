export interface ApiRes {
  isSuccess:boolean,
  message:string;
  result:any
}




interface ErrorResponse {
  timestamp: string;
  errorMessage: string;
  details: string;
  statusCode: number;
  validationErrors: ValidationError[];
}


interface ValidationError {
  field: string;
  message: string;
}
