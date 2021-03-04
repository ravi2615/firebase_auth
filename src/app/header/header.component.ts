import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  isLoggedIn = true;
   name:any
  constructor(private _authService: AuthService,
    private router: Router,
    private afu:AngularFireAuth) { }


  ngOnInit(): void {
    // console.log(this.isLoggedIn)
    // this.isLoggedIn=this._authService.isLog
    // this.afu.onAuthStateChanged((user)=>{
    //   console.log("user",user)
    //   if(user!==null){
    //     this.isLoggedIn=true
    // //  this.router.navigate(['home'])
    // }else{
      const localstorage=localStorage.getItem('UserData')
      // console.log("localstorage",localstorage)
      if(localstorage!=null || this.router.url !=='/'){
        this.isLoggedIn=true
        this.router.navigate(['home'])
      }else{
     this.isLoggedIn=false
   }
   console.log(this.router.url);
  
  
    // }
    // }).catch(error=>{
    //   console.log(error.message)
    // })

   
  
  }

  onSignOut(){
    this._authService.signOut();
    this.isLoggedIn=false
  }

 

}
