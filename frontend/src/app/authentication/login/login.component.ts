import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MyAuthService} from '../../../services/my-auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public is_click:Boolean=false;
  constructor(private fb: FormBuilder,public router:Router,public authService:MyAuthService) {
      this.loginForm = this.fb.group({
        email:['normalUser@gmail.com',[Validators.email,Validators.required]],
        password:['123456789',Validators.required]
      })
  }

  ngOnInit(): void {
  }

  signIn(){
    this.is_click=true;
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).then(result=>{
      console.log(result);
      localStorage.setItem('token',result['token']);
      localStorage.setItem('user',JSON.stringify(result));
      localStorage.setItem('role',result['role']);
      this.router.navigate(['/tickets/list'])
    }).catch(err=>{
      console.log(err);
      alert(err['message']);
      this.is_click=false;
    })
   
  }
}
