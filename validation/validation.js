// Kiểm tra sữ liệu rỗng
function checkEmptyValue(value, errorField) {
  if (!value) {
    errorField.innerHTML = "Vui lòng không bỏ trống trường này";
    return false;
  } else {
    errorField.innerHTML = "";
    return true;
  }
}

// Kiểm tra độ dài chuỗi
function checkMinMaxValue(value, errorField, min = 4, max = 50) {
  if (min <= value.length && value.length <= max) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Vui lòng nhập dữ liệu trong khoảng từ ${min} đến ${max}`;
    return false;
  }
}

// Kiểm tra Email
function checkEmailValue(value, errorField) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = regexEmail.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Vui lòng nhập đúng định dạng Email";
    return false;
  }
}

// Kiểm tra số điện thoại Viêt Nam
function checkPhoneNumberValue(value, errorField) {
  let regexPhoneNumber = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
  let isValid = regexPhoneNumber.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML =
      "Vui lòng nhập đúng định dạng số điện thoại Việt Nam";
    return false;
  }
}

// Kiểm tra Password
function checkPassword(value, errorField) {
  let regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (value.match(regexPassword)) {
    errorField.innerHTML = "";
  } else {
    errorField.innerHTML =
      "Mật khẩu phải chứa ít nhất 1 số, 1 chữ hoa, 1 chữ thường và độ dài ít nhất là 8 ký tự.";
    return false;
  }
}
