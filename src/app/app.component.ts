import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'sidebar-and-tabs-task';
  menu:any;
  tabs:{'name':string,'active':boolean}[]=[];
  activeTab:string='';
  constructor(private httpClient : HttpClient){}
  ngOnInit() {
    this.httpClient.get("assets/menu.json").subscribe(data =>{
      this.menu = data;
      this.menu.forEach((element:any) => {
        element.active=false;
      });
    })
  }
  changeActiveElement(el:any){
    this.menu.forEach((element:any) => {
      if(element.funKey == el.funKey){
        element.active=true;
        this.activeTab=element.name;
      }else{
        element.active=false;
      }
    });
  }
  openTab(menu:any){
    let tabIsFound=false;
    if(this.tabs.length>0){
      this.tabs.forEach((el:any)=>{
        el.active=false;
        if(menu.funEname == el.name){
          tabIsFound=true;
          el.active=true;
          this.activeTab=el.name;
        }
      });
    }
    if(!tabIsFound){
      this.tabs.push({'name':menu.funEname,'active':true});
      this.activeTab=menu.funEname;

    }
  }
  closeTab(tabName:string){
    this.tabs.forEach((el:any,i)=>{
      if(tabName == el.name){
        el.active=false;
        this.tabs.splice(i, 1);
        if(i ==0 && this.tabs.length != 1){
          this.tabs[i+1].active=true;
          this.activeTab=this.tabs[i+1].name;

        }else if(i !=0 && this.tabs.length != 1){
          this.tabs[i-1].active=true;
          this.activeTab=this.tabs[i-1].name;

        }
      }
    });
  }
  changeActiveTab(tab:any){
    this.tabs.forEach((el:any)=>{
      if(tab.name == el.name){
        tab.active=true;
        this.activeTab=tab.name;

      }else{
        el.active=false;
      }
    })
  }
  
}
