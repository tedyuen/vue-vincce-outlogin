// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
export class OutLoginUtils {
  window: any
  urlSuffix: string
  currentSysId: string = "0"
  sysList: Array<any> = []

  constructor(window: any, urlSuffix: string, currentSysId?: string) {
    this.window = window;
    this.urlSuffix = urlSuffix;
    if (currentSysId) {
      this.currentSysId = currentSysId;
    }
  }

  addData(sysList: Array<any>) {
    this.sysList = sysList
  }

  setCurrenntSysId(currentSysId: string) {
    this.currentSysId = currentSysId;
  }

  sendStartOutLoging(parent: any, currentSysId: string) {
    parent.postMessage( {msg: 'startOutLogin',currentSysId:2}, '*');
  }

  renderIframe(options: any) {
    const { username, password, sysList, currentSysId } = options;
    this.currentSysId = currentSysId;
    this.sysList = sysList;
    let self = this;
    this.window.addEventListener("message", function (event: any) {
      console.log('receiveMessageFromIframePage', event)
      if (event && event.data && event.data.msg === "startOutLogin") {
        self.window.document.getElementById("idFrame").contentWindow.postMessage({
          username, password, currentSysId,
          msg: "doOutlogin"
        }, '*')
      }
    }, false);
    for (let item of this.sysList) {
      console.log("vincce item:", item)
      let div = this.window.document.createElement("div");
      div.innerHTML = `<iframe id="idFrame" name="idFrame" src="${item.url}" height = "0" width = "0" frameborder="0" scrolling="auto" style = "display:none;visibility:hidden" ></iframe>`;
      this.window.document.body.appendChild(div);
    }
  }
}

let Plugin = {
  install: function (Vue: any, options: any) {
    if (options) {
      const { window, sysList, urlSuffix } = options;
      if (window && sysList && urlSuffix) {
        let outLogin = new OutLoginUtils(options.window, urlSuffix)
        Vue.ologin = outLogin
        Vue.prototype.$ologin = outLogin
      }
    }
  }
}

export default Plugin