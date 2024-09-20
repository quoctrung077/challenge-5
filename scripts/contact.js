$(document).ready(function () {

  $(document).on("click", ".btn__delete", function () {
    const contactId = $(this).closest(".cardContract").data("set");
    deleteContact(contactId);
  });

  insertCard();
});

function insertCard() {
  const cardwrap = $(".namePageBgWrap__card");
  const listContact = JSON.parse(localStorage.getItem("CONTACTS")) || [];

  const addCard = listContact.reverse().map(
    (item) => ` <div class="cardContract" data-set=${item.id}>
              <div class="btn btn__delete">
                <img src="/image/delete.svg" alt="">
              </div>
              <div>
                <img src="image/avatars/${item.imgContact}" alt="" />
              </div>
              <div class="card__name">${item.firstName + item.lastName}</div>
              <div class="card__email">${item.email}</div>
            </div>`
  );

  cardwrap.append(addCard);
}

function deleteContact(id) {
  try {
    let contacts = JSON.parse(localStorage.getItem("CONTACTS")) || [];

    const indexToDelete = contacts.findIndex((contact) => contact.id === id);
    if (indexToDelete !== -1) {
      contacts.splice(indexToDelete, 1);
      localStorage.setItem("CONTACTS", JSON.stringify(contacts));
      $(`.cardContract[data-set="${id}"]`).fadeOut(300, function () {
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


