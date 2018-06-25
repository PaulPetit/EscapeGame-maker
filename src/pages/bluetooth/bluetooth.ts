import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";

@IonicPage()
@Component({
    selector: 'page-bluetooth',
    templateUrl: 'bluetooth.html',
})
export class BluetoothPage {
    public pairedDevices: any;
    public isBluetoothActive: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
        this.bluetoothSerial.isEnabled().then(() => this.isBluetoothActive = true).catch(() => this.isBluetoothActive = false);
    }

    enableBluetooth() {
        this.bluetoothSerial.enable().then(() => this.isBluetoothActive = true);
    }

    search() {
        this.bluetoothSerial.list().then(value => this.pairedDevices = value).catch(reason => alert(reason));
    }

    connect(device) {
        if (device.name == "ESCAPE GAME #maker") {
            this.bluetoothSerial.connectInsecure(device.address).subscribe(() =>
                    this.alertCtrl.create({
                        title: 'Connecté',
                        subTitle: 'Connecté à ' + device.name,
                        buttons: [
                            {
                                text: 'Ok',
                                handler: () => {
                                    this.navCtrl.pop();
                                }
                            }
                        ]
                    }).present(),
                error1 => alert(error1));
        }
        else {
            this.alertCtrl.create({
                title: 'Erreur',
                subTitle: 'Mauvais périphérique sélectionné',
                buttons: [
                    {
                        text: 'Ok'
                    }
                ]
            }).present();
        }
    }
}
