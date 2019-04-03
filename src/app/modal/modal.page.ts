import { Component } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { ViewController } from '@ionic/core';

@Component({
    selector:'app-modal-page',
    templateUrl: './modal.page.html'
})

export class ModalPage{
    constructor(public modalCtrl: ModalController){}
    dismiss() {
        this.modalCtrl.dismiss();
      }
}