
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { ErrorService } from './error.service';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../appModels/user.model';
import { environment } from 'src/environments/environment';
import  {AngularFireAuth}  from '@angular/fire/auth';
import firebase from 'firebase/app';
import "firebase/auth";
import {Users} from './User';
import  {AngularFirestore}  from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User>(null);
  api_key:string;
  private tokenExpirationTimer : any;
  user$: Observable<any>;
  provider:any;
  users:Users
  isLog:boolean=false;
  constructor(private http: HttpClient,
    private _errService: ErrorService,
    private router: Router,
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,) { 

      this.afAuth.authState.subscribe(user=>{
        this.users = user;
      });

      this.api_key=environment.firebaseConfig.apiKey;
     
    }


  signUp(email, password) {
   return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.api_key}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(
      catchError(err=>{
        return this._errService.handleError(err)
      }),tap(res=>{
        // this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
        this.authenticatedUser(res.idToken)
        })
    )
  }

  signIn(email, password) {
   return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.api_key}`,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err=>{
        return this._errService.handleError(err)
      }),tap(res=>{
        //  this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
         this.authenticatedUser(res.idToken)
       })
    )
  }

  

  signOut(){
    this.afAuth.signOut().then(res=>{
      console.log(res)
      this.isLog=false
      localStorage.removeItem('UserData')
      this.router.navigate([''])
    }).catch(err=>{
      console.log(err)
    });
  }


    async loginWithGoogle(){
      
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        res=>{
          console.log('Login SuccessFul');
          localStorage.setItem('UserData', JSON.stringify(`${res.user.email}`));
          this.isLog=true;
          this.router.navigate(['home'])
        }
      ).catch(err=>{
        this.isLog=false
        console.log('Error while sign in'+err);
      });
   
     }

     loggedIn(){
       return !!localStorage.getItem('UserData');
     }

     private authenticatedUser(token){
        // const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
        // const user = new User(email, userId, token,expirationDate)
        // console.log("user:",user)
        // this.user.next(user);  //storing data in user subject
        // this.autoSignOut(expiresIn*1000);
        this.isLog=true
        localStorage.setItem('UserData', JSON.stringify(`token:${token}`))
      }

      async loginWithFacebook(){
        await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
          res=>{
            console.log('Login SuccessFul');
            localStorage.setItem('UserData', JSON.stringify(`${res.user.email}`));
            this.isLog=true;
            this.router.navigate(['home'])
          }
        ).catch(err=>{
          this.isLog=false
          console.log('Error while sign in'+err);
        });
     
      }

      // 3929051860521680

      //https://authemployee-2ab80.firebaseapp.com/__/auth/handler
  }


