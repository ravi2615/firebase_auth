import  {Observable}  from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../appServices/auth.service';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { ErrorService } from '../appServices/error.service';
import { Router } from '@angular/router';
import  firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
// import * as firebase from "firebase";

declare var M: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginMode:boolean = true;
  Form: FormGroup;
  error;
  errMsgs = this._errService.errorsMsgs;
  provider:any;

  constructor(private fb: FormBuilder,
    public _authService: AuthService,
    private _errService: ErrorService,
    private router: Router,
    private afAuth: AngularFireAuth,
    ) { }

  ngOnInit(): void {
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(res=>{
      console.log("Auth set local");
      this._authService.isLog=true
    }).catch(error=>{
      console.log(error)
      this._authService.isLog=false
    })
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onModeSwitch(){
    this.loginMode = !this.loginMode;
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }


  onSubmit() {
    if(this.Form.valid){
    console.log(this.Form.value)

    const email = this.Form.value.email;
    const password = this.Form.value.password;

      let authObservable : Observable<AuthResponse>

      if(!this.loginMode){
           authObservable= this._authService.signUp(email, password)
           this._authService.isLog=true
          }
        else{
          authObservable= this._authService.signIn(email, password)
          this._authService.isLog=true
        }

        authObservable.subscribe(res =>{
          // console.log(res)
          this.router.navigate(['home'])
        M.toast({ html: 'Login successfully<br>Welcome', classes: 'rounded' });
        },
        err=>{
          // console.log(err)
          
          this.error=err;

          setTimeout(()=>{                           //<<<---using ()=> syntax
            this.error="";
       }, 10000);

        })

        }
  else {
    //...
  }
  }

  loginWithGoogle(){
    this._authService.loginWithGoogle();
    this.router.navigate(['home'])
  }

  loginWithFb(){
    this._authService.loginWithFacebook();
    this.router.navigate(['home'])
    
}
  

}
