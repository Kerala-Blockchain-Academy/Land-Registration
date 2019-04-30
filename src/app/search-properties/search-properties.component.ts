import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../web3.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-search-properties',
  templateUrl: './search-properties.component.html',
  styleUrls: ['./search-properties.component.scss']
})
export class SearchPropertiesComponent implements OnInit {

  accounts :string[];
  account : string;

  state : String;
  district : string;
  village : string;
  survey : string;

  landDetails : any;
  loaded = false;
  propertyId : any;

  availableForRequest = false;
  availableForBuy = false
  contract :any;

  buttonOneDisable = false;
  buttonTwoDisable = false;

  constructor(private web3Service : Web3Service) { }

  async ngOnInit() {
    this.observeAccount();
    this.onLoad()

  }
  observeAccount(){
    this.web3Service.accountsObservable.subscribe((accounts) => {
      console.log("This is from admin:",accounts)
      this.accounts = accounts;
      this.account = accounts[0];

    });

  }

  //function to view the land details option for request land will appear
  //if the land is available for sell.

    async viewLandDetails(event){
    event.preventDefault()

    this.contract = this.web3Service.getContract();

    this.availableForRequest = false;
    this.availableForBuy = false

    this.buttonOneDisable = false;
    this.buttonTwoDisable = false;

    
    console.log("the contract:",this.contract);

   const target = event.target;
    this.state = target.querySelector('#state').value;
    this.district = target.querySelector('#district').value;
    this.village = target.querySelector('#village').value;
    this.survey = target.querySelector('#survey').value;


    console.log("Registration values:",this.state,this.district,this.village,this.survey);

   try {

    //contract function calls to get the current property status

    this.propertyId = await this.contract.methods.computeId(this.state,this.district,this.village,this.survey).call();
   //  const LandRegistryDeployed = await this.LandRegistry.deployed();
    this.landDetails = await this.contract.methods.landInfoUser(this.propertyId).call();
    this.loaded = true;
    if((this.landDetails[3] == "0x0000000000000000000000000000000000000000") && (this.landDetails[2])&&(this.landDetails[0] != this.account ))
      this.availableForRequest =true;
    if((this.landDetails[3] == this.account) && (this.landDetails[4] == 3))
      this.availableForBuy = true;
     } catch (error) {
        console.log("error:",error);
    }

  }

  //function to make a buy request to the land owner. This is avilable only if the owner is selling the property

  async makeRequest(Id){

    console.log("account:",this.account)
   try {
    
    this.landDetails = await this.contract.methods.requstToLandOwner(Id).send({
      from : this.account
    });
    this.buttonOneDisable = true;
     } catch (error) {
        console.log("error:",error);
    }

  }

  //function to buy the propery, can only buy if the request is accepted by the owner

  async buyProperty(Id){

    let mValue = parseInt(this.landDetails[1]);
    mValue += (mValue/10)
    let StringValue=  mValue.toString();
    console.log("mValue:",StringValue)
    try {

     this.landDetails = await this.contract.methods.buyProperty(Id).send({
       from : this.account,
       value: StringValue
     });
     this.buttonTwoDisable = true;
      } catch (error) {
         console.log("error:",error);
     }
 
   }

   //to set up the account in the start up

   async onLoad(){
    console.log("account array from service page",this.accounts)
    if ( !this.web3Service.accounts) {
      const delay = new Promise(resolve => setTimeout(resolve, 200));
      await delay;
      return await this.onLoad;
    }
    if(this.account == undefined){
      this.account = this.web3Service.accounts[0]
    }
  }
  

}
