import { Component, OnInit } from "@angular/core";
import { Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-training-page',
    templateUrl: 'training.page.html',
    styleUrls: ['training.page.scss']
})

export class TrainingPage implements OnInit {
    public firstConsonant: Array<string> = ['P', 'T', 'F', 'N', 'L', 'M', 'J', 'B', 'V'];
    public firstvocal: Array<string> = ['A', 'E', 'I', 'O', 'U'];
    public word: string;
    public positive: number = 0;
    public negative: number = 0;
    public h: number = 0;
    public m: number = 0;
    public s: number = 0;
    public id: any;
    public showStartBtn: boolean = true;
    public consonantArray: Array<string>;
    public numberOfTries: string;
    public triesOut: number = 0;
    public wordNumber: string;

    constructor(public modalCtrl: ModalController, private route: ActivatedRoute) {
        if (this.route.snapshot.paramMap.get("number")){
            this.numberOfTries = this.route.snapshot.paramMap.get("number");
        }else{
            this.numberOfTries = '10';
        }
        if (this.route.snapshot.paramMap.get("consonant")) {
            const val = this.route.snapshot.paramMap.get('consonant');
            this.consonantArray = val.toUpperCase().split('');
            console.log(this.consonantArray);
        } else{
            this.consonantArray = this.firstConsonant;
        }
        if (this.route.snapshot.paramMap.get("word")) {
            this.wordNumber = this.route.snapshot.paramMap.get('word');
            
        } else{
            this.wordNumber = '1';
        }
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
        document.getElementById("hms").innerHTML = "00:00:00";
    }

    start() {
        this.showStartBtn = false;
        this.positive = 0;
        this.negative = 0;
        this.h = 0;
        this.m = 0;
        this.s = 0;
        this.createClock();
        this.createWord();
    }

    restartTraining() {
        document.getElementById("hms").innerHTML = "00:00:00";
        this.triesOut = 0;
        this.positive = 0;
        this.negative = 0;
        this.h = 0;
        this.m = 0;
        this.s = 0;
    }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: ModalPage,
            componentProps: {
                time: document.getElementById("hms").innerHTML,
                positive: this.positive,
                negative: this.negative
            }
        });
        await modal.present();
        modal.onDidDismiss().then(() => {
            this.restartTraining();
            this.showStartBtn = true;
        })
    }

    stopCrono() {
        clearInterval(this.id);
    }

    createWord() {
        // if (this.consonantArray != null) {
        //     this.word = this.consonantArray[Math.floor(Math.random() * this.consonantArray.length)] + this.firstvocal[Math.floor(Math.random() * this.firstvocal.length)];
        // } else {
        //     this.word = this.firstConsonant[Math.floor(Math.random() * this.firstConsonant.length)] + this.firstvocal[Math.floor(Math.random() * this.firstvocal.length)];
        // }
        if(this.wordNumber !== '1'){
            this.word = this.consonantArray[Math.floor(Math.random() * this.consonantArray.length)] + this.firstvocal[Math.floor(Math.random() * this.firstvocal.length)] + this.firstConsonant[Math.floor(Math.random() * this.firstConsonant.length)];
        }else{
            this.word = this.consonantArray[Math.floor(Math.random() * this.consonantArray.length)] + this.firstvocal[Math.floor(Math.random() * this.firstvocal.length)];
        }
    }

    positivePoint() {
        this.positive++;
        this.createWord();
        this.checkTryOuts();
    }

    negativePoint() {
        this.negative++;
        this.createWord();
        this.checkTryOuts();
    }

    checkTryOuts() {
        this.triesOut++;
        if (this.triesOut === parseInt(this.numberOfTries)) {
            this.stopCrono();
            this.openModal();
        }
    }
}