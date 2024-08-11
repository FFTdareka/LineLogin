let regName = document.getElementById("regName");
let regButton = document.getElementById("regButton");

regButton.addEventListener('click', () => {
  let regNameText = regName.value;
  let state = Math.floor( Math.random() * 100000 ).toString().padStart( 5, '0');
  let url = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2006030047&redirect_uri=https%3A%2F%2Ffftdareka.github.io%2FLineLogin%2Fcallback%2F%3Freg%3Duid%26name%3D" + regNameText + "&state=" + state + "&scope=profile%20openid";
  location.href = url;
})
