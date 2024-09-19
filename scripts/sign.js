// xử lý form sign up
$(document).ready(function () {
  // xử lý form khi submit
  if ($("body").hasClass("signupPage")) {
    $(".btn__signup").click(function (event) {
      event.preventDefault(); // Chặn không cho gửi
      let valid = true;
      // kiểm tra các ô input
      valid = validateEmail($("#email")) && valid;
      valid = validateUsername($("#username")) && valid;
      valid = validatePassword($("#password")) && valid;
      valid = validateCheckbox($("#checkbox, .signup__checkbox--text")) && valid;
      if (valid) {
        if (!saveToLocalStorage()) {
          alert("Email đã tồn tại. Vui lòng chọn email khác.");
          return;
        }
        window.location.href = "sign-in.html";
      }
    });
  }
  // xử lý form signin
  $(".btn__signin").click(function (event) {
    event.preventDefault();
    getLocalStorage();
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
  if ($("body").hasClass("signupPage")) {
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
}

// Hàm save localstorage
function saveToLocalStorage() {
  const username = $("#username").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const checkbox = $("#checkbox").is(":checked");
  const avatarList = [
    "avatar.svg",
    "avatar1.svg",
    "avatar2.svg",
    "avatar3.svg",
  ];
  const randomIndex = Math.floor(Math.random() * avatarList.length);
  const selected_image = avatarList[randomIndex];
  const account = JSON.parse(localStorage.getItem("ACCOUNTS")) || [];
  const emailExists = account.some((u) => u.email === email);

  if (username && email && password && checkbox) {
    if (emailExists) {
      return false;
    }
    const formData = {
      email: email,
      username: username,
      password: password,
      checkbox: checkbox,
      avataruser: selected_image,
    };
    account.push(formData);
    // Chuyển đối tượng thành chuỗi JSON (JSON.stringify())
    localStorage.setItem("ACCOUNTS", JSON.stringify(account));
    return true;
  }
  return false;
}

// hàm get local storage
function getLocalStorage() {
  const enteredEmail = $("#email").val().trim();
  const enteredPassword = $("#password").val().trim();
  $("#email").removeClass("input-error");
  $("#password").removeClass("input-error");

  if (!enteredEmail || !enteredPassword) {
    if (!enteredEmail) {
      $("#email").addClass("input-error");
    }
    if (!enteredPassword) {
      $("#password").addClass("input-error");
    }
    return;
  }
  const users = JSON.parse(localStorage.getItem("ACCOUNTS")) || [];
  const user = users.find((user) => user.email === enteredEmail);
  if (user) {
    if (user.password === enteredPassword) {
      const userToStore = {
        email: user.email,
        username: user.username,
        avataruser: user.avataruser,
      };
      localStorage.setItem("USER", JSON.stringify(userToStore));
      window.location.href = "list-contact.html";
    } else {
      $("#password").addClass("input-error");
    }
  } else {
    $("#email").addClass("input-error");
  }
}
