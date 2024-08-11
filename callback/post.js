const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const reg = urlParams.get('reg');
const name = urlParams.get('name');
fetch('https://api.line.me/oauth2/v2.1/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: "https://fftdareka.github.io/LineLogin/callback",
    client_id: "2006030047",
    client_secret: "41e68957a7180b6101c6fab87039b1ca"
  })
})
.then(response => response.json())
.then(data => {
  let token = data.id_token;
  let tokenData = token.split(".");
  tokenData.shift();
  tokenData.pop();
  tokenData = JSON.parse(decodeURIComponent(escape(atob(tokenData.toString()))));
  let uid = tokenData.sub;
  let uname = tokenData.name;
  let h1 = document.createElement("h1");
  fetch('https://script.google.com/macros/s/AKfycby13MAQPRWvx4XCtzsWBVDvf73tavwdmSvV7YSce9k5L9W-tqteFgJMijVBaa5yl69SbA/exec', {
    "method": "POST",
    "mode": "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    "body": JSON.stringify({
      "uid": uid,
      "uname": uname,
      "reg": reg,
      "name": name
    })
  })
  .then(data => {
    h1.innerText = data;
    document.body.appendChild(h1);
  })
})
