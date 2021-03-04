import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(err:HttpErrorResponse) {
    if(!err.error || !err.error.error){
      return throwError(this.errorsMsgs['UNKNOWN'])
      // this.error=this.errMsgs['UNKNOWN'];
    }else{
      return throwError(this.errorsMsgs[err.error.error.message])
      // this.error=this.errMsgs[err.error.error.message];
    }
  }

  errorsMsgs = {
    UNKNOWN: "An Unknown Error is Occured",
    EMAIL_EXISTS: "This is Already Exist. Please try with another email",
    OPERATION_NOT_ALLOWED: "Password sign-in is disbled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later.",
    EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
    INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
    USER_DISABLED: "The user account has been disabled by an administrator."
  }
}
