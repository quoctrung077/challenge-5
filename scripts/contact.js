$(document).ready(function () {
  $(".btn__Add").click(function (event) {
    event.preventDefault();
    let valid = true;
    valid &= validateFirstName($("#firstName"));
    valid &= validateLastName($("#lastName"));
    valid &= validateEmail($("#email"));
    valid &= validatePhone($("#phone"));
    valid &= validateBirth($("#birth"));
    if (valid) {
      window.location.href = "list-contact.html";
      saveContact();
    }
  });
  $(document).on("click", ".btn__delete", function () {
    const contactId = $(this).closest(".cardContract").data("set");
    deleteContact(contactId);
  });
  insertCard();
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


