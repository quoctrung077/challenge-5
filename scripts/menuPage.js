$(document).ready(function () {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    loadUsernameFromLocalStorage(key);
  }
  $("#btn__logout").click(function (event) {
    window.location.href = "sign-in.html";
  });
  $("#btn__addContact").click(function (event) {
    window.location.href = "add-contact.html";
  });
  sliderPage();
});
function loadUsernameFromLocalStorage(email) {
  const storedData = localStorage.getItem(email);
  if (storedData) {
    const formData = JSON.parse(storedData);
    $("#usernameDisplay").text(formData.username);
  }
}
function sliderPage() {
  if ($("body").hasClass("contactPage")) {
    $("#contact").css("background-color", "#4880ff");
    $("#hideBg").css("background-color", "#4880ff");
    $("#text").css("color", "#FFFFFF");
  }
}
