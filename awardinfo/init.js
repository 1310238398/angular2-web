if(!antlinker){console.error('jssdk尚未加载!')}
function initWeb({file='main.js',message=true,delayTime=500}){if(message){window.addEventListener('message',function(messageEvent){var data=messageEvent.data;if(typeof data=='string'){window['__AppWebkey']=data;}},false);}
  var obj={UID:'antlinker'};antlinker.exeUserBasicInfoSdk(obj,function(obj,success){s=document.createElement("script");setTimeout(function(){s.setAttribute("src",file);document.body.appendChild(s);},delayTime)})}
