import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { TabsPage } from "../tabs/tabs";
import { Http, Headers , RequestOptions} from "@angular/http";
import {URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  data : any ={};

  constructor(public nav: NavController, public forgotCtrl: AlertController,public alertCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public http: Http) {
    this.menu.swipeEnable(false);
    this.data.email = '';
    this.data.password = '';
    this.data.response = '';
    this.http = http;
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
   
    // var SplitData;
    // SplitData = myData.split(",");
    if(this.data.email=='' || this.data.password==''){

let toast = this.toastCtrl.create({
  message: "Email and password cannot be empty",
  position: 'middle',
  duration: 3000
});
toast.present();
    }else{
      this.nav.setRoot(TabsPage);
      var headers = new Headers();
      headers.append('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
      var link = 'http://58.26.9.230/edrive_new/api/login1';
      let myData = JSON.stringify({
        email: this.data.email, 
        password: this.data.password
      });
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username',this.data.email);
      urlSearchParams.append('password',this.data.password);
      let body = urlSearchParams.toString();
      let options = new RequestOptions({headers: headers});

  
    //console.log(myData);
    this.http.post(link,myData, options)
    .subscribe(data => {
    // this.data.response = data["_body"];
    var result;
    result = data["_body"];
   // console.log(result[0]);
    if(result[0]=='Y'){
      this.nav.setRoot(TabsPage);
    }
    else if(data["_body"]=='Username and password is incorrect!')
    {
      let alert = this.alertCtrl.create({
        title: "Error",
         subTitle: data["_body"],
        buttons: ['OK']
      });
      alert.present();
    }
    }, error => {
    console.log("Oooops!");
    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000,
      position: 'top',
      cssClass: 'dark-trans',
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toast.present();
    });
    
    }
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
