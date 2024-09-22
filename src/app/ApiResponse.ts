export class ApiResponse<T>{
    status: boolean;  
    message: string; 

    
    constructor(status:boolean,message:any){
        this.status=status;
        this.message=message;
   
    }
}