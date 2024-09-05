let authCode = document.getElementById("AuthCode");
let authButton = document.getElementById("AuthButton");
const gasUrl = "https://script.google.com/macros/s/AKfycbxq0GZ32gwrg9pTKxAzSO9Kfyjcx1oy8KzX-e9gHIGLvKVdjBQ8ZYCdDiHcemDmf1MTAw/exec";

document.addEventListener('DOMContentLoaded', () => {
  if (location.hash != "") {
    authCode.value = location.hash.replace("#", "");
    authButton.click();
  }
})

authButton.addEventListener('click', () => {
  let authCodeText = authCode.value;
  let errorText;
  let state = Math.floor( Math.random() * 100000 ).toString().padStart( 5, '0');
  let url = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2006030047&redirect_uri=https%3A%2F%2Ffftdareka.github.io%2FLineLogin%2Fcallback%2F%3Freg%3Datt&state=" + state + "&scope=profile%20openid";
  let authExp = document.getElementById("AuthExp");
  fetch(gasUrl, {
    "method": "POST",
    "Content-Type": "application/x-www-form-urlencoded",
    "body": JSON.stringify({
      "reg": "auth"
    })
  })
  .then(response => response.text())
  .then(data => {
    if (authCodeText == data) {
      location.href = url;
    } else {
      errorText = document.createElement("p");
      errorText.innerText = "認証コードが違います。";
      document.body.insertBefore(errorText, authExp);
    }
  })
})
