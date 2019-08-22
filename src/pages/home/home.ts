import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches: String[];
  isRecording = false;
  hasPermission = false;
  constructor(public navCtrl: NavController, private platform: Platform,
    private speechRecognition: SpeechRecognition, private changeDetectorRef: ChangeDetectorRef) {

    this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
      console.warn(`isRecognitionAvailable : ${available}`);
    });

    this.getPermissions();
  }

  isAndroid() {
    this.platform.is('android');
  }

  getPermissions() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      console.warn(`hasPermission : ${hasPermission}`);
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
      }
      else {
        this.hasPermission = hasPermission;
      }
    });
  }

  startListening() {
    let options = {
      language: 'en-US'
    };
    this.speechRecognition.startListening(options).subscribe((matches: string[]) => {
      this.matches = matches;
      this.changeDetectorRef.detectChanges();
    }, (error) => console.error(error));
    this.isRecording = true;
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false
    });
  }

}
