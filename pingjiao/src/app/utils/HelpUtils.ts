import { Injectable } from "@angular/core";
import { ModalController, AlertController, LoadingController, ToastController } from "ionic-angular";

@Injectable()
export class HelpUtils {
    constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, private Loading: LoadingController, private toastCtrl: ToastController) {
    }


}