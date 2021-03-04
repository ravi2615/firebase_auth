import { Component, OnInit } from '@angular/core';
import { CrudService } from '../appServices/crud.service';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [CrudService],
})

export class EmployeesComponent implements OnInit {

  
  employee: {};
  employeeName: string;
  employeeAge: number;
  employeeAddress: string;

  message:string;

  constructor(public crudeService:CrudService) { }

  ngOnInit(): void {

    this.crudeService.get_Allemployee().subscribe(data =>{
      this.employee = data.map(e =>{
        return {
          id: e.payload.doc.id,
          isdit:false,
          name:e.payload.doc.data()['name'],
          age:e.payload.doc.data()['age'],
          address:e.payload.doc.data()['address']
        } 
      })
    })

  }

  createRecord(){
    let Record = {};
    Record['name'] = this.employeeName;
    Record['age'] = this.employeeAge;
    Record['address'] = this.employeeAddress;
    console.log(Record)
    this.crudeService.create_NewEmployee(Record).then(res =>{
      this.employeeName='';
      this.employeeAge=undefined;
      this.employeeAddress='';

      console.log(res);
      this.message= "Employee data save Successfully";
      setTimeout(()=>{                       
        this.message="";
   }, 10000);
    }).catch(error =>{
      console.log(error);
    })
  }


  editRecord(Record){
    Record.isedit = true;
    Record.editname =Record.name;
    Record.editage = Record.age;
    Record.editaddress = Record.address;
    console.log(Record)
  }

  updateRecord(recordData){
    let record = {};
    record['name']= recordData.editname;
    record['age']= recordData.editage;
    record['address']= recordData.editaddress;
    console.log(record)
    this.crudeService.update_employee(recordData.id,record);
    recordData.isedit=false;
    this.message= "Employee data Updated Successfully";
      setTimeout(()=>{                       
        this.message="";
   }, 10000);
  }
  
  deleteRecord(id){
    if(confirm("Are you sure to delete this record?")){
      this.crudeService.delete_employee(id);
      this.message= "Employee data deleted Successfully";
      setTimeout(()=>{                       
        this.message="";
   }, 10000);
    }
  }

}
