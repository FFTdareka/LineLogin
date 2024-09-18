let authCode = document.getElementById("AuthCode");
let authButton = document.getElementById("AuthButton");
const gasUrl = "https://script.google.com/macros/s/AKfycbzSk5aodCprl3dphsfyCWGRAMzJrKtJBStIMSaqqzOyLHZlyftxbLhYjs1WkfFZWmu-LQ/exec";

document.addEventListener('DOMContentLoaded', () => {
  if (location.hash != "") {
    authCode.value = location.hash.replace("#", "");
    authButton.click();
  }
})

authButton.addEventListener('click', () => {
  if (document.getElementById("er") != null) {
    document.getElementById("er").remove();
  }
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
    if (data == "時間外") {
      errorText = document.createElement("p");
      errorText.innerText = "認証時間外です。";
      errorText.style.color = "#FF0000";
      errorText.id = "er";
      document.body.insertBefore(errorText, authExp);
    } else if (authCodeText == data) {
      location.href = url;
    } else {
      errorText = document.createElement("p");
      errorText.innerText = "認証コードが違います。";
      errorText.style.color = "#FF0000";
      errorText.id = "er";
      document.body.insertBefore(errorText, authExp);
    }
  })
})
