import { Component } from '@angular/core';
import { ButtonComponent } from "../../component/button/button.component";
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent,CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Ragistraion: FormGroup;
  loginForm:FormGroup;
  isLogin:boolean=true;
  isSignUP:boolean=false;
  constructor(private route: Router, private login: LoginService) {
    this.Ragistraion = new FormGroup({
      'Email': new FormControl('',[Validators.required,Validators.email]),
      'Name': new FormControl('',[Validators.required]),
      'number': new FormControl('',[Validators.required,Validators.maxLength(10)]),
      'password': new FormControl('',[Validators.required]),
      'Cpassword': new FormControl('',[Validators.required]),

    })
    this.loginForm = new FormGroup({
      'userName': new FormControl('admin@gmail.com',[Validators.required,Validators.email]),
      'password': new FormControl('admin@1234',[Validators.required]),
    })
  }
  get signIn() {
    return this.Ragistraion.controls;
  }

  registrationValidation(): boolean {
    if (this.signIn['Email'].invalid || this.signIn['password'].invalid || this.signIn['Cpassword'].invalid || this.signIn['Cpassword'].value !=this.signIn['password'].value || this.signIn['Name'].invalid || this.signIn['number'].invalid) {
      return true;
    }
    else {
      return false;
    }

  }
  
  userAdded:boolean | undefined;
  async addUser()
  {
    
      let Email=this.Ragistraion.get('Email')?.value;
      let Password=this.Ragistraion.get('password')?.value;

      let Name=this.Ragistraion.get('userName')?.value;
      let Number=this.Ragistraion.get('number')?.value;
      this.userAdded= this.login.addUser(Email,Password,Name,Number);
      if(this.userAdded)
      {
        Swal.fire({
          title: "Success!",
          text: "User Addes!",
          icon: "success"
        })
        this.isLogin=true;
        this.isSignUP=false;
        this.Ragistraion.reset();
        this.loginForm.controls['userName'].setValue(Email);
        this.loginForm.controls['password'].setValue(Password);
      }
      else{
        Swal.fire({
          title: "ERROR!",
          text: "User Alredy Exist!",
          icon: "error"
        }).then(i=>{
          location.reload();
        });
      }
    debugger
  }
  userLogin:boolean | undefined;
  async LoginUser()
  {
    let Username=this.loginForm.get('userName')?.value;
    let Password=this.loginForm.get('password')?.value;
    this.userLogin=this.login.logiUser(Username,Password);
    if(this.userLogin)
    {
     this.route.navigate(['User/home'])
     localStorage.setItem("profile",Username);
    }
    else{
      Swal.fire({
        title: "ERROR!",
        text: "Enter Correct Detail's!",
        icon: "error"
      }).then(i=>{
        // location.reload();
        this.loginForm.reset()
      });
    }
  }
  loginStatus(){
    this.isLogin=true;
    this.isSignUP=false;
  }
  SignupStatus(){
    this.isLogin=false;
    this.isSignUP=true;
    
  }

}
