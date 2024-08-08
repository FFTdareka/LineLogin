let authCode = document.getElementById("AuthCode");
let authButton = document.getElementById("AuthButton");
let auth = "AbCdE";

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
  let url = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2006030047&redirect_uri=https%3A%2F%2Ffftdareka.github.io%2FLineLogin%2Fcallback.html&state=" + state + "&scope=profile%20openid";
  let authExp = document.getElementById("AuthExp");
  if (authCodeText == auth) {
    location.href = url;
  } else {
    errorText = document.createElement("p");
    errorText.innerText = "認証コードが違います。";
    document.body.insertBefore(errorText, authExp);
  }
})
