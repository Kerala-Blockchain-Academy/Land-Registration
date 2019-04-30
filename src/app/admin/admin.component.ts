import { Component, OnInit } from '@angular/core';

import {Web3Service} from '../web3.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  accounts : string[];
  account : string;
  LandRegistry : any;

  village : string;
  superUserAddress : string;
  constructor(private web3Service : Web3Service) { }

  state : string;
  district : string;
  Rvillage : string;
  survey : number;
  RegistrationAddress : string;
  marketValue : number;
  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.observeAccount();      
  }
  //this function is to get the details of the current account 
  
  observeAccount(){
    this.web3Service.accountsObservable.subscribe((accounts) => {
      console.log("This is from admin:",accounts)
      this.accounts = accounts;
      this.account = accounts[0];
    });
  }
//function to add super user who have the privillage to register property

  async addSuperUser(event){
    event.preventDefault()

    const contract = this.web3Service.getContract();
    console.log("the contract:",contract);

   const target = event.target;
    this.village = target.querySelector('#village').value;

    this.superUserAddress = target.querySelector('#address').value;
    console.log("values",this.village,this.superUserAddress)
    if(!this.LandRegistry){
     console.log("LandRegistry not set");
    }
   try {
    
   //  calling the contract function to add super user

    const transaction = await contract.methods.addSuperAdmin(this.superUserAddress,this.village).send({
      from : this.account
    });
     if(!transaction){
       console.log("Transaction Faild!!!");
     }
     else{
       console.log("Transaction succesful");
     }
     } catch (error) {
        console.log("error:",error);
    }

  }
// function that take the registration details from the frontend and pass it to the contract

  async Register(event){
    event.preventDefault()

    const contract = this.web3Service.getContract();
    console.log("the contract:",contract);

   const target = event.target;
    this.state = target.querySelector('#state').value;
    this.district = target.querySelector('#district').value;
    this.Rvillage = target.querySelector('#village').value;
    this.survey = target.querySelector('#survey').value;
    this.RegistrationAddress = target.querySelector('#address').value;
    this.marketValue = (target.querySelector('#marketvalue').value);
    this.marketValue = this.web3Service.web3.utils.toWei(this.marketValue, 'ether');
    

    console.log("Registration values:",this.state,this.district,this.Rvillage,this.survey,this.RegistrationAddress,this.marketValue);
    if(!this.LandRegistry){
     console.log("LandRegistry not set");
    }
   try {
     //calculating the property id from the input details , the id will uniquely identify a perticular property

    const propertyId = await contract.methods.computeId(this.state,this.district,this.Rvillage,this.survey).call();

   //  calling the contract function for registration and passing the values including the calculated property ID

    const transaction = await contract.methods.Registration(this.state,this.district,this.Rvillage,this.survey,this.RegistrationAddress,this.marketValue,propertyId).send({
      from : this.account
    });
     if(!transaction){
       console.log("Transaction Faild!!!");
     }
     else{
       console.log("Transaction succesful");
     }
     } catch (error) {
        console.log("error:",error);
    }

  }


}
