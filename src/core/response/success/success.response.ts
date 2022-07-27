interface DataResponse {
  message?: string;
  data?: any;
  pagination?: any;
}

export class SucessResponse {
  private message: string;
  private data: any;
  private pagination: any;

  constructor(inputData: DataResponse) {
    'message' in inputData && (this.message = inputData.message);
    'data' in inputData && (this.data = inputData.data);
    'pagination' in inputData && (this.pagination = inputData.pagination);
  }
}
