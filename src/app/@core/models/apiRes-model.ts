export interface ApiRes {
  Data: any;
  Errors: ErrorResponse;
  Success: boolean;
  Message: string
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
