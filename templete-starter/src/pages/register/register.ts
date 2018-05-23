import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { TabsPage } from "../tabs/tabs";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  responseData : any;
  userData = {"name": "","password": "","email": ""};

  constructor(public nav: NavController, public authService:AuthServiceProvider) {
  }

  // register and go to home page
  register() {
    this.authService.postData(this.userData,'register').then((result)=>{
      this.responseData = result;
      if(this.responseData.userData){
        console.log(this.responseData);
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.nav.setRoot(TabsPage);
      }
      else{ console.log("User already exists");}
    }, (err)=>{

    
    });
    
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
