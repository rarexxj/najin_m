// import Crypto from "crypto-js";
const cook = {
  set(name, value,days) {
    var d = new Date;
    if(days==null){days=1}
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  },
  get(name) {
    var v =document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  },
  delete(name) {
    cook.set(name, '', -1);
  },
}
export default {
  cook:cook,
  base64encode(data){
    // var words = Crypto.charenc.UTF8.stringToBytes(str);
    // words = Crypto.util.bytesToBase64(words);
    // return words
    var words =  Crypto.enc.Base64.stringify(Crypto.enc.Utf8.parse(JSON.stringify(data)))
    return words
  },
  base64decode(data){
    var words = JSON.parse(Crypto.enc.Base64.parse(data).toString(Crypto.enc.Utf8))
    return words;
  },
  sethistory() {
    cook.set("history", window.location.href)
  },
  path:'http://test.adsuper.cn:8084/najin_api/v1',
  path2:'http://test.adsuper.cn:8084/najin_v1/',
  // path:'/api',
  IsPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  set_font(num){

    // 计算、转换布局单位
    var html = document.getElementsByTagName('html')[0];
    var designFontSize = 100;
    var designWidth = 640;
    if (num) {
      designWidth = num;
    }

    function setFontSize() {
      var winWidth = document.documentElement.getBoundingClientRect().width;
      var fontSize = winWidth / designWidth * designFontSize;

      html.style.fontSize = fontSize + 'px';
    }

    setFontSize();
    window.addEventListener('resize', function () {
      setFontSize();
    });

    return this;
  }
}
