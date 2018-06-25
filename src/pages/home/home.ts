import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    public data = [0, 0, 0, 0];

    constructor(public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
        this.bluetoothSerial.subscribe('\n').subscribe(value => this.onData(value), error1 => this.onError(error1));
    }

    sendData() {
        let code = "";
        for (var i = 0; i < this.data.length; i++) {
            code += this.data[i].toString();
        }
        this.bluetoothSerial.write(code);
    }

    add(input: string) {
        if (this.data[input] < 9) {
            this.data[input] += 1;
        }
        else {
            this.data[input] = 0;
        }
    }

    remove(input: string) {
        if (this.data[input] > 0) {
            this.data[input] -= 1;
        }
        else {
            this.data[input] = 9;
        }
    }

    private onData(data) {
        // On retire les 2 derniers caractères envoyés par l'arduino
        data = data.slice(0, data.length - 2);

        let title = "";
        let subTitle = "";

        switch (data) {
            case "codeCorrect":
                title = "Victoire";
                subTitle = "Vous êtes un maker averti !<br>Récupérez votre récompense";
                break;
            case "codeIncorrect":
                title = "Oh oh !";
                subTitle = "Le code est incorrect<br>Réessayez";
                break;
        }

        this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        }).present();
    }

    private onError(error) {
        alert(error);
    }
}
