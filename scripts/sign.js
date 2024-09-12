// xử lý form sign up
$(document).ready(function () {
  // xử lý form khi submit
  $(".btn__sign").click(function (event) {
    event.preventDefault(); // Chặn không cho gửi
    let valid = true;
    // kiểm tra các ô input
    valid = validateEmail($("#email"));
    valid = validateUsername($("#username"));
    valid = validatePassword($("#password"));
    valid = validateCheckbox($("#checkbox, .signup__checkbox--text"));
    if (valid) {
      saveToLocalStorage();
      window.location.href = "sign-in.html";
    }
  });

  //xử lý khi mất focus ra khỏi ô
  var input = $("#email, #username, #password");
  $(input).on("blur", function () {
    validateInput($(this));
  });
});

// Hàm kiểm tra có phải email với regex
function validateEmail(emailElement) {
  const email = $("#email").val().trim();
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const isValid = emailRegex.test(email);
  emailElement.toggleClass("input-error", !isValid);
  return isValid;
}

// Hàm kiểm tra độ dài của username
function validateUsername(usernameElement) {
  const username = usernameElement.val().trim();
  const isValid = username.length >= 3 && username.length <= 16;
  usernameElement.toggleClass("input-error", !isValid);
  return isValid;
}

// Hàm kiểm tra password với regex
function validatePassword(passwordElement) {
  const password = passwordElement.val().trim();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,}$/;
  const isValid = passwordRegex.test(password);
  passwordElement.toggleClass("input-error", !isValid);
  return isValid;
}

// Hàm kiểm tra checkbox
function validateCheckbox(checkboxElement) {
  const isChecked = checkboxElement.is(":checked");
  checkboxElement
    .toggleClass("input-error-text", !isChecked)
    .css("border-color", isChecked ? "" : "red");
  return isChecked;
}

// Hàm xử lý các input khi mất focus
function validateInput(inputElement) {
  const id = inputElement.attr("id");
  switch (id) {
    case "email":
      validateEmail(inputElement);
      break;
    case "username":
      validateUsername(inputElement);
      break;
    case "password":
      validatePassword(inputElement);
      break;
  }
}

// Hàm save localstorage
function saveToLocalStorage() {
  const username = $("#username").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const checkbox = $("#checkbox").is(":checked");
  // xem user có rỗng ko
  if (username) {
    //chứa data
    const formData = {
      email: email,
      username: username,
      password: password,
      checkbox: checkbox,
    };
    // Chuyển đối tượng thành chuỗi JSON (JSON.stringify())
    localStorage.setItem(username, JSON.stringify(formData));
  } else {
    console.error("Username không hợp lệ.");
  }
}
