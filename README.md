# vue vincce outlogin

## Install

```bash
$ npm i vue-vincce-outlogin --save
```

## Usage

```js
// 注册
import OutLogin from "vue-vincce-outlogin";
Vue.use(OutLogin, {
  window: window,
  sysList: [],
  urlSuffix: "user/outlogin"
});

// 登录其他系统
this.$ologin.renderIframe({
  username: '用户名',
  password: '密码',
  sysList: 'sysList节点数据',
  currentSysId: '当前系统id'
});

// 被其他系统登录
// 新建OutLogin.vue  config路径配置成/user/outlogin 与login路径平级
// whiteList白名单加入以上路径名 (outlogin)
// OutLogin.vue添加以下代码
addListener() {
  let self = this;
  parent.postMessage({ msg: "startOutLogin", currentSysId: '填入当前系统id' }, "*");
  window.onmessage = function(e) {
    if (e.data.msg === "doOutlogin") {
      // 执行当前系统的登录逻辑
      self
        .Login({
          userName: e.data.username,
          password: e.data.password
        })
        .then(() => {
          // console.log(res);
        })
        .catch(() => {
          // console.log(err);
        })
        .finally(() => {});
    }
  };
}
```