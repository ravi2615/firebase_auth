import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public firebase:AngularFirestore) { }

  create_NewEmployee(Record){
    return this.firebase.collection('Employee').add(Record);
  }

  get_Allemployee(){
    return this.firebase.collection('Employee').snapshotChanges();
  }

  update_employee(recordId, record){
    console.log(record)
    console.log(recordId)
    //this.firebase.doc('Employee/'+recordId).update(record);
     this.firebase.collection('Employee').doc(recordId).update(record).catch(error=>{
       console.log("error",error)
     });
  }

  delete_employee(recordId){
    this.firebase.doc('Employee/'+recordId).delete();
  }
}
