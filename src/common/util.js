/**
 * Created by hao.luo on 2018/5/21.
 */
exports.saveSessionItem = function(key, value) {
  sessionStorage.setItem(key, value)
}

exports.getSessionItem = function(key) {
  return sessionStorage.getItem(key)
}

exports.removeSessionItem = function(key) {
  return sessionStorage.removeItem(key)
}

exports.setCookie = function (cname, cvalue, time) {
  let d = new Date();
  d.setTime(d.getTime() + (time * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

exports.getCookie = function (cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
