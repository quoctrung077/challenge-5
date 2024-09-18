$(document).ready(function () {
  $("#btn__logout").click(function (event) {
    window.location.href = "sign-in.html";
  });
  $("#btn__addContact").click(function (event) {
    window.location.href = "add-contact.html";
  });
  loadUserData();
  sliderPage();
});
function loadUserData(email) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users);
  const user = users.find(user => user.email === email);
  console.log(user);

  if (user) {
    $("#imguser").attr("src", `image/avatarusers/${user.avataruser}`);
    $("#usernameDisplay").text(user.username);
  }
}
function sliderPage() {
  if ($("body").hasClass("contactPage")) {
    $("#contact").css("background-color", "#4880ff");
    $("#hideBg").css("background-color", "#4880ff");
    $("#text").css("color", "#FFFFFF");
  }
}
