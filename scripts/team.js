let teams = [];
$(document).ready(function () {
    teams = JSON.parse(localStorage.getItem("TEAMS")) || [];
    $(document).on("click", ".btn__delete", function () {
        const teamId = $(this).closest(".cardTeam").data("set");
        deleteTeam(teamId);
    });

    insertCardTeam();
    searchTeamByEmail();
});

function insertCardTeam() {
    const cardwrap = $(".namePageBgWrap__card");

    const addCard = teams.reverse().map(
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