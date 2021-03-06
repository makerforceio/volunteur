import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, Tabs } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

import { EventsApiProvider } from '../../providers/events-api/events-api';
import { TokenProvider } from '../../providers/token/token';
import { FindPage } from '../find/find';

import { CONFIG, CONFIG_TOKEN, ApplicationConfig } from '../../config';

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
  max_participants:string = "0";
  starttime:string = "";
  endtime:string = "";

  token:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private tokenProvider:TokenProvider, private eventsApi:EventsApiProvider, private tc:ToastController, private events:Events, @Inject(CONFIG_TOKEN) private config : ApplicationConfig) {
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
      // this.http.post(this.config.EVENTS_URL + '/event/new', {
      //   token : this.token,
      //   name : this.name,
      //   description : this.description,
      //   organisation : this.organisation,
      //   max_participants : this.max_participants,
      //   starttime : this.starttime,
      //   endtime : this.endtime
      // }, {}).subscribe((data: any) => {
      //   let toast = this.tc.create({
      //     message : 'Added new event successfully!',
      //     duration : 2500,
      //     position : 'bottom'
      //   });
      //   toast.present();
      //   var t:Tabs = this.navCtrl.parent;
      //   t.select(0);
      // }, (res) => {
      //   console.log(res);
      //   let toast = this.tc.create({
      //     message : res.error.message,
      //     duration : 2500,
      //     position : 'bottom'
      //   });
      //   toast.present();
      // });
      this.eventsApi.createEvent({
        name : this.name,
        description : this.description,
        organisation : this.organisation,
        max_participants : this.max_participants,
        starttime : this.starttime,
        endtime : this.endtime
      }).then((res) => {
        let toast = this.tc.create({
          message : 'Added new event successfully!',
          duration : 2500,
          position : 'bottom'
        });
        toast.present();
        var t:Tabs = this.navCtrl.parent;
        t.select(0);
      }, (err_message) => {
        let toast = this.tc.create({
          message : err_message,
          duration : 2500,
          position : 'bottom'
        });
        toast.present();
      });
    }
  }

}
