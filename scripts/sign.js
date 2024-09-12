// xử lý form signup
// $(document).ready(function () {
//   // Xử lý sự kiện khi form được submit
//   $(".btn__sign").click(function (event) {
//     const emailValue = $('#email').val()
//     const usernameValue = $('#username').val()
//     const passwordValue = $('#password').val()
//     const user = {
//         emailValue,
//         passwordValue,
//         usernameValue
//     }
//     console.log(user)

//     let valid = true; // để kiểm tra sự hợp lệ của form
//     //kiểm tra o email
//     const email = $('#email').val().trim();
//     const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//     if (!emailRegex.test(email)) {
//       $('#email').addClass('input-error');
//       valid = false;
//     } else {
//       $('#email').removeClass('input-error');
//     }

//     // Kiểm tra ô username
//     const username = $("#username").val().trim();
//     if (username.length < 3 || username.length > 16) {
//       $("#username").addClass("input-error");
//       valid = false;
//     } else {
//       $("#username").removeClass("input-error");
//     }

//     // kiểm tra password
//     const password = $('#password').val().trim();
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//     if (!passwordRegex.test(password)) {
//       $('#password').addClass('input-error');
//       valid = false;
//     } else {
//       $('#password').removeClass('input-error');
//     }

//     // Kiểm tra checkbox
//     if (!$("#checkbox").is(":checked")) {
//       $(".sign-up-checkbox--text").addClass("input-error-text");
//       valid = false;
//     } else {
//       $(".sign-up-checkbox--text").removeClass("input-error-text");
//     }

//     // Nếu form không hợp lệ, ngăn chặn gửi form
//     if (valid) {
//         console.log("da chuyen")
//         window.location.href = 'http://127.0.0.1:5500/singin.html'; // Thay đổi URL đến trang bạn muốn chuyển hướng
//         window.localStorage.setItem('list-user', JSON.stringify(user))
//       } else {
//         event.preventDefault(); // Ngăn chặn việc gửi form nếu không hợp lệ
//         console.log("khum cho gui")
//     }
//   });

//   // Xử lý sự kiện khi mất focus ra khỏi ô input để kiểm tra
//   $("#email, #username, #password").on("blur", function () {
//     if ($(this).val().trim() === "") {
//       $(this).addClass("input-error");
//     } else {
//       $(this).removeClass("input-error");
//     }
//   });
// });

// xử lý form sign up đã tinh chỉnh để sử dụng lại
$(document).ready(function () {
  // xử lý form khi submit
  $(".btn__sign").click(function (event) {
    let valid = true;
    // kiểm tra các ô input
    valid = validateEmail($("#email")) && valid;
    valid = validateUsername($("#username")) && valid;
    valid = validatePassword($("#password")) && valid;
    valid = validateCheckbox($("#checkbox, .sign-up-checkbox--text")) && valid;
    if (valid) {
      saveToLocalStorage();
      window.location.href = "sign-in.html";
      console.log("qua page sign in")
    } else {
      event.preventDefault(); // Chặn không cho gửi
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
  const tooltip = emailElement.next('.tooltip');
  if (!emailRegex.test(email)) {
    emailElement.addClass("input-error");
    tooltip.text("Please enter a valid email address.");
    return false;
  } else {
    emailElement.removeClass("input-error");
    tooltip.text(""); 
    return true;
  }
}

// Hàm kiểm tra độ dài của username
function validateUsername(usernameElement) {
  const username = usernameElement.val().trim();
  const tooltip = usernameElement.next('.tooltip');
  if (username.length < 3 || username.length > 16) {
    usernameElement.addClass("input-error");
    tooltip.text("Username must be between 3 and 16 characters.");
    return false;
  } else {
    usernameElement.removeClass("input-error");
    tooltip.text("");
    return true;
  }
}

// Hàm kiểm tra password với regex
function validatePassword(passwordElement) {
  const password = passwordElement.val().trim();
  const tooltip = passwordElement.next('.tooltip');
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*)[A-Za-z\d@$!%*?&#]{6,}$/;
  if (!passwordRegex.test(password)) {
    passwordElement.addClass("input-error");
    tooltip.text("Password must be at least 6 characters and include a capital letter, a number, and a special character.");
    return false;
  } else {
    passwordElement.removeClass("input-error");
    tooltip.text("");
    return true;
  }
}

// Hàm kiểm tra checkbox
function validateCheckbox(checkboxElement) {
  if (!checkboxElement.is(":checked")) {
    checkboxElement.addClass("input-error-text");
    return false;
  } else {
    checkboxElement.removeClass("input-error-text");
    return true;
  }
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
  // xem user có rỗng ko
  if (username) {
    //chứa data
    const formData = {
      email: $("#email").val().trim(),
      username: username,
      password: $("#password").val().trim(),
      checkbox: $("#checkbox").is(":checked")
    };
    // Chuyển đối tượng thành chuỗi JSON (JSON.stringify())
    localStorage.setItem(username, JSON.stringify(formData));
  } else {
    console.error("Username không hợp lệ.");
  }
}