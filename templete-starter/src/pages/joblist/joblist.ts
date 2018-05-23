import { LoadingController } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-joblist',
  templateUrl: 'joblist.html',
})
export class JoblistPage {

  data : any = {};
  imageURI:any;
imageFileName:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    private camera: Camera,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public loadingController: LoadingController,
    public imageUrl: string,
    private file: File,
    private transfer : FileTransfer

  ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad JoblistPage');
  }
  onTakePhoto() {
 

    const options: CameraOptions={
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.imageURI = imageData;
    },(err)=>{
      console.log(err);
      this.presentToast(err);
             // toast.present();
    })
  }

  uploadFile(){
    let loader = this.loadingController.create({
      content: "Uploading.."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions={
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI,'http://', options)
    .then((data)=>{
      console.log(data+"Uploaded Successfully");
      this.imageFileName = ""
      loader.dismiss();
      const toast = this.toastCtrl.create({
                message: 'Image uploaded successfully',
                duration: 2500
              });
              toast.present();
    },(err)=>{
      console.log(err);
      loader.dismiss();
   this.presentToast(err);
    })
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
}
