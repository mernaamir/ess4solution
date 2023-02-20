import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clientsArr:{'id':number,'firstName':string,'lastName':string}[]=[];
  closeResult: string='';
  firstName:string='';
  lastName:string='';
  deletedclient:any;
  editedClient:any;
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
  DeleteClient(client: any, mymodal : any) {
    this.open(mymodal);
    this.deletedclient = client;
  }
  onDeleteClient() {
    this.modalService.dismissAll();
    this.clientsArr.forEach((el:any,i)=>{
      if(this.deletedclient.id == el.id){
        this.clientsArr.splice(i,1);
      }
    })
  }
  addNewClient(){
    this.clientsArr.push({id:this.clientsArr.length+1,firstName:this.firstName,lastName:this.lastName})
    this.firstName='';
    this.lastName=''
    this.modalService.dismissAll();
  }
  editClient(client: any, mymodal : any){
    this.open(mymodal);
    this.editedClient = {...client};
  }
  updateClient(){
    this.modalService.dismissAll();
    this.clientsArr.forEach((el:any)=>{
      if(el.id == this.editedClient.id){
        el.firstName=this.editedClient.firstName;
        el.lastName=this.editedClient.lastName;
      }
    })
  }
}
