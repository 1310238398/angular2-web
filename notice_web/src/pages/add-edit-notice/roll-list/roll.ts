import {NoticeService} from './../../Notice.service';
import {HelpUtils} from '../../../app/utils/HelpUtils';
import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../../http/http.Service";
import {PersonList} from "../person-list/PersonList";

/** create by hanzhendong
 * Generated class for the RollPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-roll',
    templateUrl: 'roll.html',
})
export class RollPage {
    Rolls: Array<object> = [];
    SelectedRolls: Array<object> = [];
    selectItems: Array<object> = [];
    Contacts: Array<object> = [];
    sendData = {Roll: '', items: []};
    selectedRollNum: number = 0;
    selectedContactNum: number = 0;
    selectedDept: number = 0;
    NotSaveRoll: boolean = false;
    PersonList: boolean = false;

    constructor(private NoticeService: NoticeService, private HelpUtils: HelpUtils, private http: HttpService, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private modalCtrl: ModalController) {
        this.loadRoll({});
        this.sendData = this.navParams.get('data') || {};
        this.NoticeService.addContact.subscribe(
            (item) => {
                if (item.roll) {
                    this.selectedRollNum += item.UserCount || 0;
                }

            }
        );
        this.NoticeService.reduceRollContact.subscribe(
            (item) => {
                if (item.Type == 1 || item.Type == 2 || item.URID) {
                    this.selectedRollNum -= item.UserCount || 0;
                } else {
                    this.selectedRollNum -= 1;
                }

            }
        );
        if (this.sendData.items && this.sendData.items.length > 0) {
            this.Contacts = this.sendData.items;
            this.sendData.items.forEach(item => {
                this.Rolls.forEach(roll => {

                    if (roll['URID'] == item.URID) {
                        roll['check'] = true;
                        //this.setRolls(item);
                    }
                });
                this.selectItems.push(item);
                if (item.Type == 1 || item.Type == 2 || item.URID) {
                    this.selectedRollNum += item.UserCount || 0;
                } else {
                    this.selectedRollNum += 1;
                }
            });
        } else {
            this.Contacts = this.NoticeService.getContacts();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RollPage');
    }

    loadRoll(item) {
        this.http.postJSON({Identify: 'must'}, '/app/userroll/select').then(
            data => {
                this.Rolls = data.Data || [];
                this.Rolls.forEach((value, index) => {
                    this.selectItems.forEach((ele) => {
                        value['check'] = false;
                    })
                });
                this.selectItems.forEach((ele) => {
                    this.Rolls.forEach((value, index) => {
                        if (value['URID'] == ele['URID']) {
                            value['check'] = true
                        }
                    })
                });
                if (this.sendData.items && this.sendData.items.length > 0) {
                    this.sendData.items.forEach(item => {
                        this.Rolls.forEach(roll => {
                            if (roll['URID'] == item.URID) {
                                roll['check'] = true;
                            }
                        });
                    });
                }
                /*    if (!this.PersonList) {
                        this.sendData = this.navParams.get('data');
                        if (this.sendData) {
                            if (this.sendData.Roll) {
                                this.NotSaveRoll = false;
                                this.sendData.items.forEach(element => {
                                    this.Rolls.forEach(roll => {
                                        if (roll['URID'] == element.URID) {
                                            roll['check'] = true;
                                            this.setRolls(element);
                                        }
                                    });
                                });
                            } else {
                                this.NotSaveRoll = true;
                                console.log(this.sendData);
                                if (this.sendData.items && this.sendData.items.length > 0) {
                                    this.Contacts = this.sendData.items;
                                    this.sendData.items.forEach(item => {
                                        if (item.Type == 1 || item.Type == 2) {
                                            this.selectedDept += 1;
                                            this.selectedNum += item.UserCount || 0;
                                        } else {
                                            this.selectedNum += 1;
                                        }
                                    });
                                }
                            }
                        }
                    }*/
                if (item.flag && item.URID) {
                    this.Rolls.forEach((value, index) => {
                        if (value['URID'] == item.URID) {
                            value['check'] = true
                            this.setRolls(value);
                        }
                    })
                }
            }
        );
    }

    dismiss() {
        this.HelpUtils.presentAlert({
            subTitle: '是否选择退出？',
            buttons: [{
                text: '取消', cssClass: 'zj-alert-close', role: 'cancel', handler: () => {
                }
            }, {
                text: '确定', handler: () => {
                    this.viewCtrl.dismiss();
                    this.NoticeService.removeContactAll();
                }
            }]
        });
    }

    navPersonList() {
        //this.NoticeService.removeContactAll();
        /* this.Contacts.forEach((ele) => {
             debugger;
             if (!ele['roll']) {
                 console.log(ele);
                 this.NoticeService.removeContact(ele);
             } else {
                 console.log('ggg')
             }
         })*/
        this.NoticeService.removeContactAll();
        this.selectedRollNum = 0;
        this.selectedContactNum = 0;
        this.selectItems.forEach((ele) => {
            if (ele['roll']) {
                this.NoticeService.setContacts(ele);
            }
        })
        let modal = this.modalCtrl.create(PersonList, {}, {enableBackdropDismiss: false});
        /* if (this.selectedContactNum) {

             this.selectedRollNum -= this.selectedContactNum;
         }*/

        modal.onDidDismiss(item => {
            /*
            判断是否没保存名单
            */
            console.log(item);
            if (item) {
                if (item.RollClose) {
                    this.viewCtrl.dismiss();
                    return
                }
                if (item.SaveRoll) {
                    this.Contacts = this.NoticeService.getContacts() || [];
                    this.selectedRollNum += item.selectedNum;
                    this.selectedContactNum = item.selectedNum;
                    this.loadRoll({flag: true, URID: item.URID});
                }
                if (item.NotSaveRoll) {
                    this.Contacts = this.NoticeService.getContacts() || [];
                    if (item.selectedNum) {
                        this.selectedRollNum += item.selectedNum;
                        this.selectedContactNum = item.selectedNum;
                    } else {
                        this.selectedRollNum = 0;
                    }
                    this.loadRoll({flag: true, URID: item.URID});
                }
                if (item.Back) {
                    this.Contacts = this.NoticeService.getContacts() || [];
                    if (item.selectedNum) {
                        this.selectedRollNum += item.selectedNum;
                        this.selectedContactNum = item.selectedNum;
                    }
                    this.loadRoll({flag: true, URID: item.URID});
                }
            }
        });
        modal.present();
    }

    /*    setRolls(roll) {
            this.NotSaveRoll = false;
            this.SelectedRolls.forEach((element, index) => {
                if (roll['URID'] == element['URID']) {
                    this.SelectedRolls.splice(index, 1);
                    this.num -= roll.UserCount || 0;
                }
            });
            if (roll.check) {
                this.SelectedRolls.push(roll);
                this.num += roll.UserCount || 0;
            }
        }*/
    setRolls(roll) {

        if (roll.check) {
            roll.roll = true;
            roll.Type = 7;
            this.selectItems.push(roll);
            this.NoticeService.setContacts(roll);
        } else {
            this.NoticeService.getContacts().forEach((element, index) => {
                if (element['URID'] == roll['URID']) {
                    console.log(roll.UserCount)
                    this.NoticeService.removeRollContact(roll);
                }
            });
            this.selectItems.forEach((el, index) => {
                if (el['URID'] == roll.URID) {
                    this.selectItems.splice(index, 1)
                }
            })
        }
    }

    removeContact(item) {
        item.check = false;
        this.Rolls.forEach((element, index) => {
            if (item['URID'] == element['URID']) {
                element['check'] = false
            }
        });
        this.NoticeService.removeRollContact(item);
        this.selectItems.forEach((el, index) => {
            if (el['URID'] == item.URID) {
                this.selectItems.splice(index, 1)
            }
        })
    }

    removeRoll(roll) {
        roll['check'] = false;
        let index = this.SelectedRolls.indexOf(roll);
        if (index >= 0) {
            this.SelectedRolls.splice(index, 1);
            this.selectedRollNum -= roll.UserCount || 0;
        }
    }

    saveMessage() {

        if (!this.NoticeService.getContacts().length) {
            this.HelpUtils.presentAlert({
                title: '提示',
                subTitle: '请至少选择一个名单',
                buttons: [{
                    text: '确定',
                    role: "cancle"
                }]
            });
        } else {
            /*单一保存模式*/
            /*  if (this.NotSaveRoll) {
                  this.viewCtrl.dismiss({Roll: false, items: this.Contacts});
              } else {
                  this.viewCtrl.dismiss({Roll: true, items: this.SelectedRolls});
              }*/
            this.viewCtrl.dismiss({items: this.Contacts});
        }
        /*   this.SelectedRolls.forEach(element => {
            console.log(element);
            this.http.postJSON({ URID: element['URID'] }, '/app/userroll/one').then(
              data => {
                this.selectItems.push(data);
                this.viewCtrl.dismiss(this.selectItems);
              }
            );
          }); */
    }
}
