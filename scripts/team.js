$(document).ready(function () {
    $(".btn__Add").click(function (event) {
        event.preventDefault();
        let valid = true;
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
    });
    $(document).on("click", ".btn__delete", function () {
        const teamId = $(this).closest(".cardTeam").data("set");
        deleteTeam(teamId);
    });
    insertCardTeam();
    searchTeamByEmail();
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

function validatePosition(positionElement) {
    const position = $("#position").val().trim();
    const isValid = position.length > 0 && position.length <= 20 && !/\d/.test(position);;
    positionElement.toggleClass("input-error", !isValid);
    return isValid;
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

function insertCardTeam() {
    const cardwrap = $(".namePageBgWrap__card");
    const listTeam = JSON.parse(localStorage.getItem("TEAMS")) || [];
    const addCard = listTeam.reverse().map(
        (item) => `<div class="cardTeam" data-set=${item.id}>
            <div class="btn btn__delete">
                <img src="/image/delete.svg" alt="" />
            </div>
            <div class="cardTeam__img">
                <img src="image/avatarteams/${item.imgTeam}" alt="" />
            </div>
            <div class="cardTeam__name">${item.firstName + " " + item.lastName}</div>
            <div class="cardTeam__position">${item.position}</div>
            <div class="cardTeam__email">${item.email}</div>
        </div>`
    );

    cardwrap.append(addCard);
}

function deleteTeam(id) {
    try {
        let teams = JSON.parse(localStorage.getItem("TEAMS")) || [];

        const indexToDelete = teams.findIndex((contact) => contact.id === id);
        if (indexToDelete !== -1) {
            teams.splice(indexToDelete, 1);
            localStorage.setItem("TEAMS", JSON.stringify(teams));
            $(`.cardTeam[data-set="${id}"]`).fadeOut(300, function () {
                $(this).remove();
            });
            console.log("Xóa liên hệ thành công");
            if (typeof updateContactCount === "function") {
                updateContactCount();
            }
        } else {
            console.log("Không tìm thấy liên hệ cần xóa");
        }
    } catch (error) {
        console.error("Lỗi khi xóa liên hệ:", error);
        alert(`Có lỗi xảy ra khi xóa liên hệ: ${error.message}`);
    }
}

function searchTeamByEmail() {
    const searchInput = $("#searchEmail");

    searchInput.on("input", function () {
        const searchValue = $(this).val().toLowerCase();
        const cards = $(".cardTeam");
        cards.each(function () {
            const email = $(this).find(".cardTeam__email").text().toLowerCase();
            if (email.includes(searchValue)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
}