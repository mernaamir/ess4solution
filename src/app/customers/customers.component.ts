import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customersArr:{'id':number,'firstName':string,'lastName':string}[]=[];
  closeResult: string='';
  firstName:string='';
  lastName:string='';
  deletedcustomer:any;
  editedCustomer:any;
  constructor(private modalService: NgbModal,){}
  ngOnInit(){}
  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  DeleteCustomer(customer: any, mymodal : any) {
    this.open(mymodal);
    this.deletedcustomer = customer;
  }
  onDeleteCustomer() {
    this.modalService.dismissAll();
    this.customersArr.forEach((el:any,i)=>{
      if(this.deletedcustomer.id == el.id){
        this.customersArr.splice(i,1);
      }
    })
  }
  addNewCustomer(){
    this.customersArr.push({id:this.customersArr.length+1,firstName:this.firstName,lastName:this.lastName})
    this.firstName='';
    this.lastName=''
    this.modalService.dismissAll();
  }
  editCustomer(customer: any, mymodal : any){
    this.open(mymodal);
    this.editedCustomer = {...customer};
  }
  updateCustomer(){
    this.modalService.dismissAll();
    this.customersArr.forEach((el:any)=>{
      if(el.id == this.editedCustomer.id){
        el.firstName=this.editedCustomer.firstName;
        el.lastName=this.editedCustomer.lastName;
      }
    })
  }
}
