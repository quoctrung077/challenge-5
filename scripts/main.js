$(document).ready(function () {
    const isTeamPage = window.location.href.includes("team.html");
    const isContactPage = window.location.href.includes("add-contact.html") || window.location.href.includes("list-contact.html");

    $(".btn__Add").click((event) => {
        event.preventDefault();
        let valid = true;

        if (isContactPage) {
            valid &= validateFirstName($("#firstName"));
            valid &= validateLastName($("#lastName"));
            valid &= validateEmail($("#email"));
            valid &= validatePhone($("#phone"));
            valid &= validateBirth($("#birth"));
            if (valid) {
                window.location.href = "list-contact.html";
                saveContact();
            }
        } else if (isTeamPage) {
            valid &= validateFirstName($("#firstName"));
            valid &= validateLastName($("#lastName"));
            valid &= validateEmail($("#email"));
            valid &= validatePhone($("#phone"));
            valid &= validatePosition($("#position"));
            if (valid) {
                $(".container").hide();
                $(".namePageBgWrap__card").show();
                saveTeam();
                location.reload(); scripts / team.js
            }
        }
    });

    $("#btn__logout").click(() => {
        localStorage.removeItem("USER")
        window.location.href = "sign-in.html";
    });

    $("#btn__addContact").click(() => {
        window.location.href = "add-contact.html";
    });

    $("#team").click(() => {
        window.location.href = "team.html";
    });

    $("#contact").click(() => {
        window.location.href = "list-contact.html";
    });

    $("#btn__addNewNember").click(() => {
        $(".namePageBgWrap__card, .namePageBg__wrap").hide();
        $('.container ').css('display', 'flex');
    });

    loadUserData();
    sliderPage();
});

function validateFirstName(firstnameElement) {
    const firstname = $("#firstName").val().trim();
    const isValid = firstname.length >= 1 && firstname.length <= 16;
    firstnameElement.toggleClass("input-error", !isValid);
    return isValid;
}

function validateLastName(lastnameElement) {
    const lastname = $("#lastName").val().trim();
    const isValid = lastname.length >= 3 && lastname.length <= 16;
    lastnameElement.toggleClass("input-error", !isValid);
    return isValid;
}

function validateEmail(emailElement) {
    const email = $("#email").val().trim();
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = emailRegex.test(email);
    emailElement.toggleClass("input-error", !isValid);
    return isValid;
}

function validatePhone(phoneElement) {
    const phone = $("#phone").val().trim();
    const phoneRegex = /^\d{10,15}$/;
    const isValid = phoneRegex.test(phone);
    phoneElement.toggleClass("input-error", !isValid);
    return isValid;
}

function validateBirth(birthElement) {
    const birth = $("#birth").val().trim();
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = birthRegex.test(birth);
    birthElement.toggleClass("input-error", !isValid);
    return isValid;
}

function validatePosition(positionElement) {
    const position = $("#position").val().trim();
    const isValid = position.length > 0 && position.length <= 20 && !/\d/.test(position);;
    positionElement.toggleClass("input-error", !isValid);
    return isValid;
}

function getRamdomImage() {
    const imgList = [
        "av1.svg",
        "av2.svg",
        "av3.svg",
        "av4.svg",
        "av5.svg",
        "av6.svg",
    ];
    const randomIndex = Math.floor(Math.random() * imgList.length);
    const selected_image = imgList[randomIndex];
    return selected_image;
}

function saveContact() {
    const firstName = $("#firstName").val().trim();
    const lastName = $("#lastName").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const birth = $("#birth").val().trim();
    const gender = $("#gender").val();
    const img = getRamdomImage();

    if (firstName && lastName && email && phone && birth && gender) {
        const contact = JSON.parse(localStorage.getItem("CONTACTS")) || [];
        const maxId =
            contact.length > 0 ? Math.max(...contact.map((c) => c.id)) : 0;
        const newId = maxId + 1;
        const listcontact = {
            id: newId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            birth: birth,
            gender: gender,
            imgContact: img,
            createdAt: new Date().toISOString(),
        };

        contact.push(listcontact);
        localStorage.setItem("CONTACTS", JSON.stringify(contact));
    }
}

function getRamdomAvatarTeam() {
    const avteamList = [
        "avteam.svg",
        "avteam2.svg",
        "avteam3.svg",
        "avteam4.svg",
        "avteam5.svg",
        "avteam6.svg",
    ];
    const randomIndex = Math.floor(Math.random() * avteamList.length);
    const selected_image = avteamList[randomIndex];
    return selected_image;
}

function saveTeam() {
    const firstName = $("#firstName").val().trim();
    const lastName = $("#lastName").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const position = $("#position").val().trim();
    const gender = $("#gender").val();
    const img = getRamdomAvatarTeam();

    if (firstName && lastName && email && phone && position && gender) {
        const team = JSON.parse(localStorage.getItem("TEAMS")) || [];
        const maxId =
            team.length > 0 ? Math.max(...team.map((c) => c.id)) : 0;
        const newId = maxId + 1;
        const listTeam = {
            id: newId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            position: position,
            gender: gender,
            imgTeam: img,
            createdAt: new Date().toISOString(),
        };

        team.push(listTeam);
        localStorage.setItem("TEAMS", JSON.stringify(team));
    }
}

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
        $("#contact, #hideBg").css("background-color", "#4880ff");
    } else {
        $("#team, #hideBg").css("background-color", "#4880ff");
    }
    $("#text").css("color", "#FFFFFF");
}