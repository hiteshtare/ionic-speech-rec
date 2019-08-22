import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches: String[];
  isRecording = false;

  constructor(public navCtrl: NavController, private platform: Platform,
    private speechRecognition: SpeechRecognition, private changeDetectorRef: ChangeDetectorRef) {

  }

  isAndroid() {
    this.platform.is('android');
  }

  getPermissions() {
    this.speechRecognition.hasPermission().then((hasPermission) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
      }
    });
  }

  startListening() {
    let options = {
      language: 'en-US'
    };
    this.speechRecognition.startListening(options).subscribe((matches) => {
      this.matches = matches;
      this.changeDetectorRef.detectChanges();
    });
    this.isRecording = true;
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false
    });
  }

}
