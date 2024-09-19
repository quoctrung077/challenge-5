$(document).ready(function () {
  $("#btn__logout").click(function (event) {
    localStorage.removeItem("USER")
    window.location.href = "sign-in.html";
  });
  $("#btn__addContact").click(function (event) {
    window.location.href = "add-contact.html";
  });
  $("#team").click(function (event) {
    window.location.href = "team.html";
  });
  $("#contact").click(function (event) {
    window.location.href = "list-contact.html";
  });
  $("#btn__addNewNember").click(function (event) {
    $(".namePageBgWrap__card").hide();
    $(".namePageBg__wrap").hide();
    $('.container ').css('display', 'flex');
  });
  loadUserData();
  sliderPage();
});

function loadUserData() {
  const infoUser = $(".namePage__navbarTop");
  const user = JSON.parse(localStorage.getItem("USER")) || {};
  const addUser = `<div class="navbarTop__avatarImg">
            <img class="imguers" src="image/avatarusers/${user.avataruser}" alt="" />
          </div>
          <div class="navbarTop__wrapInfo">
            <div id="usernameDisplay" class="navbarTop__wrapInfo--text">${user.username}</div>
    <div class="navbarTop__wrapInfo--des">User</div></div> `;

  infoUser.append(addUser);
}


function sliderPage() {
  if ($("body").hasClass("contactPage")) {
    $("#contact").css("background-color", "#4880ff");
    $("#hideBg").css("background-color", "#4880ff");
    $("#text").css("color", "#FFFFFF");
  } else {
    $("#team").css("background-color", "#4880ff");
    $("#hideBg").css("background-color", "#4880ff");
    $("#text").css("color", "#FFFFFF");
  }

}
