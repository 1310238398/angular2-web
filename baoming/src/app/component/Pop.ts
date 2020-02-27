/**
 * Created by hanzhendong on 2017/4/10.
 */

import {Component} from "@angular/core";
@Component({
  selector: 'loading',
  template: `
    <style>
      .spinnerw {
        margin: 160px auto 0;
        width: 80px;
        text-align: center;
      }

      .spinnerw>div {
        width: 18px;
        height: 18px;
        background-color: #eb9d21;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      }

      .spinnerw .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }

      .spinnerw .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }

      @-webkit-keyframes sk-bouncedelay {
        0%,
        80%,
        100% {
          -webkit-transform: scale(0)
        }
        40% {
          -webkit-transform: scale(1.0)
        }
      }

      @keyframes sk-bouncedelay {
        0%,
        80%,
        100% {
          -webkit-transform: scale(0);
          transform: scale(0);
        }
        40% {
          -webkit-transform: scale(1.0);
          transform: scale(1.0);
        }
      }
    </style>
    <div class="spinnerw" id="spinnerw">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>`
})
export class Pop {

}
