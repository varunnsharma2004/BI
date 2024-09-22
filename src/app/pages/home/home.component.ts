import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { ServiceService } from '../../service.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MailServicesService } from '../../mail-services.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, ReactiveFormsModule,DatePipe,DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  addNewUser: boolean = false;
  isMail: boolean = false;
  newGroup: boolean = false;
  newExpens: boolean = false;
  groupAavlable:boolean=false;
  userName: any;
  GroupName: any;
  Groups: any[] = [];
  TempMemeber: any[] = [];
  TempGrp: any[] = [];
  EmailForm: FormGroup;
  MembersForm: FormGroup;
  constructor(private grp: ServiceService, private email: MailServicesService) {
    this.Groups = this.grp.Groups();
    console.log(this.Groups);
  
    debugger;
    this.EmailForm = new FormGroup({
      'ToMail': new FormControl('', [Validators.required, Validators.email]),
      'subject': new FormControl(''),
      'msg': new FormControl('', [Validators.required]),
    });

    this.MembersForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'Expenses': new FormControl('', [Validators.required]),
      'PaymentBy': new FormControl('', [Validators.required]),
    });
  }
  grpName: any;
  indexVal: any;
  addNew(grp: any, indx: any) {
    this.grpName = grp;
    this.indexVal = indx;

    this.addNewUser = true;

  }
  openMail() {
    this.isMail = true;
  }

  close() {

    this.addNewUser = false;
    this.isMail = false;
    this.newExpens = false;
  }
  userAddes: boolean = false;
  addUsers() {
    this.userAddes = this.grp.addMembers(this.grpName, this.userName, this.indexVal);
    if (this.userAddes) {
      Swal.fire({
        title: "Success!",
        text: "User added!",
        icon: "success"
      }).then(i => {
        this.addNewUser = false;
        this.userName = null;
      });
    }
    else {
      Swal.fire({
        title: "Warning!",
        text: "User Already Exist!",
        icon: "warning"
      }).then(i => {
        this.addNewUser = false;
        this.userName = null;
      });
    }
  }


  response: any[] = [];
  SendMail() {
    const toMail = this.EmailForm.get('ToMail')?.value;
    const sub = this.EmailForm.get('subject')?.value;
    const msg = this.EmailForm.get('msg')?.value;

    this.response = this.email.sendMail(toMail, sub, msg);
    if (this.response) {
      Swal.fire({
        title: "Mail Send!",
        text: this.response[0].to + " " + "mail Sended",
        icon: "success"
      }).then(i => {
        this.EmailForm.reset();
        this.isMail = false;

      })
    }
  }
  memberDelete(grpIndx: any, indx: any) {
    this.grp.removeMember(grpIndx, indx);
  }
  expIndex: any;
  addNewExpenses(grpName: any, members: any, indx: any) {
    this.TempGrp = grpName;
    this.TempMemeber = members;
    this.expIndex = indx;
    this.newExpens = true;

  }

  expenses: any[] = [];
  ExpensAddes() {
    const title = this.MembersForm.get('title')?.value;
    const expens = this.MembersForm.get('Expenses')?.value;
    const paymentBy = this.MembersForm.get('PaymentBy')?.value;
    this.expenses = this.grp.addNewExpenses(title, expens, paymentBy, this.TempGrp, this.expIndex);

    if (this.expenses) {
      Swal.fire({
        title: "Expenses Added!",
        text: "Expenses Added",
        icon: "success"
      }).then(i => {
        this.MembersForm.reset();
        this.newExpens = false;
        
        this.GoPayment(this.expIndex,paymentBy,expens);

      })
    }

  }


  GoPayment(indx:any,paymentBy:any,expens:any){
   this.grp.PaymentByMember(indx,paymentBy,expens);
    debugger
  }
}
