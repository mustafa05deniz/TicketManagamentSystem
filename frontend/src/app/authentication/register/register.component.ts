import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from '../../../services/my-auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  public signUpForm: FormGroup;
  is_click: boolean;
  constructor(private fb: FormBuilder,public router:Router,public authService:MyAuthService) {
      this.signUpForm = this.fb.group({
        name:['demo',Validators.required],
        email:['demo@demo.com',[Validators.email,Validators.required]],
        password:['123456789',Validators.required],
        rePassword:['123456789',Validators.required]

      })
  }

  ngOnInit(): void {
  }

  signUp(){
    alert("closed")
    /*
    this.authService.register(this.signUpForm.value.email,this.signUpForm.value.password).then(result=>{
      this.router.navigate(['/auth/login'])
    }).catch(err=>{
      console.log(err);


    })
    */
  }

}
