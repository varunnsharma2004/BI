import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailServicesService {
Email:any[]=[];
  constructor() { }

  sendMail(To:any,Subject:any,Msg:any)
  {
this.Email=[{
  to:To,
  sub:Subject,
  msg:Msg
}]
return this.Email;
  }
}
