import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import Swal from 'sweetalert2';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule,FormControl,Validators, ReactiveFormsModule} from '@angular/forms';
import { MailServicesService } from '../../mail-services.service';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  newGroup: boolean = false;
  isMail: boolean = false;
  GroupName: any;
EmailForm:FormGroup;
userData:any[]=[];
userName:any;
  constructor( private route: Router,private grp: ServiceService,private email:MailServicesService,private login:LoginService) {
this.userData=this.login.getuserDetail();

debugger

    this.EmailForm=new FormGroup({
      'ToMail': new FormControl('',[Validators.required,Validators.email]),
      'subject': new FormControl(''),
      'msg': new FormControl('',[Validators.required]),
    });
  }
  AddNewGrp() {
    this.newGroup = true;
  }
  openMail()
  {
    this.isMail = true;
  }
  close() {

    this.newGroup = false;

  }


  GroupAdded: boolean = false;
  addGroup() {
    
    this.GroupAdded = this.grp.addnewGroup(this.GroupName);
debugger
    if (this.GroupAdded) {
      Swal.fire({
        title: "Success!",
        text: "Group added!",
        icon: "success"
      }).then(i => {
       
        this.GroupName = null;
      });
    }
    else {
      Swal.fire({
        title: "Warning!",
        text: "Group Already Exist!",
        icon: "warning"
      }).then(i => {
        this.GroupName = null;
      });
    }
    this.newGroup=false;
  }


logOut()
{
  
  this.login.logOut();
  this.route.navigate(['User/Login'])
}
}
