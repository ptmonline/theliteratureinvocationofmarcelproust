import { Component, Input } from "@angular/core";
import { ModalController, NavParams } from '@ionic/angular';
import { ViewController } from '@ionic/core';

@Component({
    selector: 'app-modal-page',
    templateUrl: './modal.page.html'
})

export class ModalPage {
    public rnd: number;
    @Input() value: number;
    public time: any;
    public positivePoints: number;
    public negativePoints: number;
    constructor(public modalCtrl: ModalController, navParams: NavParams) {
        this.rnd = Math.floor(Math.random() * 15) + 1;
        console.log(this.rnd);
        console.log('VALUE RECEIVE IS: ', this.value);
        console.log(navParams.data);
        this.time = navParams.data.time;
        this.positivePoints = navParams.data.positive;
        this.negativePoints = navParams.data.negative;
    }
    dismiss() {
        this.modalCtrl.dismiss();
    }
}