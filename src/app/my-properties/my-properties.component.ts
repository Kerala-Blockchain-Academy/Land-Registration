import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../web3.service';
import {Form} from '@angular/forms'
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss']
})
export class MyPropertiesComponent implements OnInit {
  accounts : string[];
  account : string;
  contract : any;
  properties : any;
  propertyInfo = [];


  constructor(private web3Service : Web3Service,private router:Router, location:Location) {
  }
   

 async ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this); 
     window.addEventListener('load', (event) => {
     // setTimeout(this.contract = this.web3Service.getContract(),200);
      this.observeAccount();
      console.log("property list array:",this.propertyInfo);
    });

    //this function is to get the details of the current account 

    this.observeAccount()

    //this load assets function will load the asset details of the current user in the start-up of this page
    this.loadAssets();
    console.log("property array:",this.propertyInfo)


  }
  async loadAssets(){
    console.log("account array from service page",this.accounts)
    if (!this.web3Service.getContract() || !this.web3Service.accounts) {
      const delay = new Promise(resolve => setTimeout(resolve, 200));
      await delay;
      console.log("Iteration")
      return await this.loadAssets();
    }
    this.contract = this.web3Service.getContract()
    if(this.account == undefined){
      this.account = this.web3Service.accounts[0]
    }
    this.properties = await this.contract.methods.viewAssets().call({from : this.account});
    for(let item of this.properties)
    {
      this.propertyDetails(item);
    }
    console.log("Asset list:",this.properties);
    console.log("First asset:",this.properties[0]);
    console.log("the contract:",this.contract);
 
  }
  async propertyDetails(property){
     let details = await this.contract.methods.landInfoOwner(property).call();
     console.log("Land details",details);
     let state = true;
     let choiceButton = false
     let buttonEnabled = details[4];
     if (details[5] == "0x0000000000000000000000000000000000000000")
      state = false;
     else
      buttonEnabled = true;
    

     this.propertyInfo.push([property,details[0],details[1],details[2],details[3],buttonEnabled,details[5],state,details[6],choiceButton]);
     
  
     return true;
  }
  observeAccount(){
    this.web3Service.accountsObservable.subscribe((accounts) => {
      console.log("This is from admin:",accounts)

      if(this.account != accounts[0]){
      this.accounts = accounts;
      this.account = accounts[0];
      this.propertyInfo = [];
      this.loadAssets();
      console.log("property list array:",this.propertyInfo);

      }
    });
  }

  //function is used to make available the property for sale by the owner

  async makeAvailable(id,i){
      this.propertyInfo[i][5] = true;
      console.log("make available id:",id);
      await this.contract.methods.makeAvailable(id).send({
        from : this.account
      });

  }

  //function to accept a request from a buyer
  
  async acceptRequest(id,i){
    this.propertyInfo[i][9] = true;
    await this.contract.methods.processRequest(id,3).send({
      from : this.account
    });

  }

 //function to reject a request from a buyer

  async rejectRequest(id,i){
    this.propertyInfo[i][9] = false;
    await this.contract.methods.processRequest(id,2).send({
      from : this.account
    });

  }
}
