import { Component, OnInit } from "@angular/core";
import { Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
    selector: 'app-training-page',
    templateUrl: 'training.page.html',
    styleUrls: ['training.page.scss']
})

export class TrainingPage implements OnInit {
    public firstConsonant: Array<string> = ['P', 'T', 'F', 'N', 'L', 'M', 'J'];
    public firstvocal: Array<string> = ['A', 'E', 'I', 'O', 'U'];
    public word: string;
    public positive: number = 0;
    public negative: number = 0;
    public h: number = 0;
    public m: number = 0;
    public s: number = 0;
    public id: any;

    constructor(public modalCtrl: ModalController) {
    }

    createClock() {
        this.id = setInterval(() => {
            document.getElementById("hms").innerHTML = "00:00:00";
            let hAux, mAux, sAux;
            this.s++;
            if (this.s > 59) { this.m++; this.s = 0; }
            if (this.m > 59) { this.h++; this.m = 0; }
            if (this.h > 24) { this.h = 0; }

            if (this.s < 10) { sAux = "0" + this.s; } else { sAux = this.s; }
            if (this.m < 10) { mAux = "0" + this.m; } else { mAux = this.m; }
            if (this.h < 10) { hAux = "0" + this.h; } else { hAux = this.h; }

            document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux;
        }, 1000)
    }



    ngOnInit() {
        this.createClock();
        this.createWord();
    }

    async openModal() {

        const modal = await this.modalCtrl.create({component: ModalPage});
        return await modal.present();
      }

    stopCrono(){
        clearInterval(this.id);
    }

    createWord() {
        this.word = this.firstConsonant[Math.floor(Math.random() * this.firstConsonant.length)] + this.firstvocal[Math.floor(Math.random() * this.firstvocal.length)];
    }

    positivePoint() {
        this.positive++;
        this.createWord();
        if(this.positive === 5){
            this.stopCrono();
            this.openModal();
        }
    }

    negativePoint() {
        this.negative++;
        this.createWord();
    }
}