import { Component } from '@angular/core';
import {Web3Service} from './web3.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  accounts : string[];
  account : string;

  constructor(private web3Service : Web3Service, private routerModule: RouterModule) { }
  
  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.observeAccount();      
  }
  observeAccount(){
    this.web3Service.accountsObservable.subscribe((accounts) => {
      console.log("This is from admin:",accounts)
      this.accounts = accounts;
      this.account = accounts[0];
    });
  }
}
