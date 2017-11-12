import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { TokenProvider } from '../../providers/token/token'

import config from '../../config'

/**
 * Generated class for the CreateeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html',
})
export class CreateEventPage {
  name:string = "";
  description:string = "";
  organisation:string = "";
  max_paticipants:string = "0";
  starttime:string = "";
  endtime:string = "";
  maximum:string = "";

  token:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private tokenProvider:TokenProvider, private tc:ToastController, private events:Events) {
    this.token = tokenProvider.token;
    events.subscribe('token-update', (token) => {
      this.token = token;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateeventPage');
  }

  createevent(){
    var startdt = new Date(this.starttime);
    var enddt = new Date(this.endtime);
    if(startdt.getTime() > enddt.getTime()){
      let toast = this.tc.create({
        message : 'An event cannot end before it begins!',
        duration : 2500,
        position : 'bottom'
      });
      toast.present();
      this.starttime = '';
      this.endtime = ''
    }else{
      this.http.post(config.EVENTS_URL + '/login', {
        username : this.username,
        password : this.password
      }, {}).subscribe((data: any) => {
        this.tokenProvider.setToken(data.token);
        this.onLoginSuccess();
      }, (res) => {
        let toast = this.tc.create({
          message : res.body.message,
          duration : 2500,
          position : 'bottom'
        });
        toast.present();
      });
    }
  }

}
