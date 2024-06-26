// kiểm tra dữ liệu rỗng
function checkEmptyValue(value, errorField) {
  if (value) {
    // true - có dữ liệu
    errorField.innerHTML = "";
    errorField.style.display = "none";
    return true;
  } else {
    //false - rỗng
    errorField.innerHTML = "Vui lòng không bỏ trống trường này";
    errorField.style.display = "block";
    return false;
  }
}

// kiểm tra độ dài chuỗi
function checkMinMaxValue(value, errorField, min, max) {
  if (min <= value.length && value.length <= max) {
    // đúng quy định
    errorField.innerHTML = "";
    errorField.style.display = "none";
    return true;
  } else {
    // ko đúng quy định
    errorField.innerHTML = `Vui lòng nhập dữ liệu trong khoảng từ ${min} đến ${max} ký tự`;
    errorField.style.display = "block";
    return false;
  }
}

// ============== kiểm tra mã nhân viên: từ 4-6 số bất kỳ =============
function checkTKNV(value, errorID) {
  let errorField = document.getElementById(errorID);
  let regexString = /^\d{4,6}$/;
  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexString.test(value);
  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    errorField.parentElement.querySelector("input").classList.add("valid");
    isValid &= true;
  } else {
    errorField.innerHTML = "TKNV phải từ 4-6 ký tự";
    errorField.style.display = "block";
    errorField.parentElement.querySelector("input").classList.remove("valid");
    isValid &= false;
  }
}

// ============== kiểm tra tên nhân viên: phải là chữ =============
function checkTenNV(value, errorID) {
  let errorField = document.getElementById(errorID);
  let regexString = /^\D{2,25}$/;
  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexString.test(value);
  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    errorField.parentElement.querySelector("input").classList.add("valid");
    return true;
  } else {
    errorField.innerHTML = "Tên không được là số, từ 2-25 ký tự";
    errorField.style.display = "block";
    errorField.parentElement.querySelector("input").classList.remove("valid");
    return false;
  }
}

// ============== check email đúng định dạng =============
function checkEmail(value, errorID) {
  let errorField = document.getElementById(errorID);
  let regexString =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexString.test(value);
  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    errorField.parentElement.querySelector("input").classList.add("valid");
    return true;
  } else {
    errorField.innerHTML = "Vui lòng nhập đúng định dạng email!";
    errorField.style.display = "block";
    errorField.parentElement.querySelector("input").classList.remove("valid");
    return false;
  }
}

// ============== check password:  6-10 ký tự (chứa ít nhất 1 ký tự số,
//                                 1 ký tự in hoa, 1 ký tự đặc biệt) =============
function checkPW(value, errorID) {
  let errorField = document.getElementById(errorID);
  let regexString = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexString.test(value);
  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    errorField.parentElement.querySelector("input").classList.add("valid");
    return true;
  } else {
    errorField.innerHTML =
      "Sai định dạng! Mật khẩu phải từ 6-10 ký tự, ít nhất 1 chữ Hoa, một số và một ký tự đặc biệt";
    errorField.style.display = "block";
    errorField.parentElement.querySelector("input").classList.remove("valid");
    return false;
  }
}

// ============== check ngày làm: DD/MM/YYYY =============
function checkDate(value, errorID) {
  let errorField = document.getElementById(errorID);
  let regexString = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;
  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexString.test(value);
  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    errorField.parentElement.querySelector("input").classList.add("valid");
    return true;
  } else {
    errorField.innerHTML = "Sai định dạng! Định dạng dd/mm/yyyy";
    errorField.style.display = "block";
    errorField.parentElement.querySelector("input").classList.remove("valid");
    return false;
  }
}

// ============== check lương CB: từ 1.000.000 - 20.000.000 =============
function checkLuongCB(value, errorID) {
  let errorField = document.getElementById(errorID);
  let isValid = "";
  if (value * 1 >= 1000000 && value * 1 <= 20000000) {
    isValid = true;
  } else {
    isValid = false;
  }

  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    errorField.parentElement.querySelector("input").classList.add("valid");
    return true;
  } else {
    errorField.innerHTML = "Lương CB phải là số từ 1 000 000 - 20 000 000";
    errorField.style.display = "block";
    errorField.parentElement.querySelector("input").classList.remove("valid");
    return false;
  }
}

// ============== check chức vụ =============
function checkChucVu(value, errorID) {
  let errorField = document.getElementById(errorID);
  let isValid = "";
  if (value == "Sếp" || value == "Trưởng phòng" || value == "Nhân viên") {
    isValid = true;
  } else {
    isValid = false;
  }

  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    errorField.parentElement.querySelector("select").classList.add("valid");
    return true;
  } else {
    errorField.innerHTML = "Chưa chọn chức vụ";
    errorField.style.display = "block";
    errorField.parentElement.querySelector("select").classList.remove("valid");
    return false;
  }
}

// ============== check số giờ làm: min 80, max 200 =============
function checkGioLam(value, errorID) {
  let errorField = document.getElementById(errorID);
  let isValid = "";
  if (value * 1 >= 80 && value * 1 <= 200) {
    isValid = true;
  } else {
    isValid = false;
  }

  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    errorField.parentElement.querySelector("input").classList.add("valid");
    return true;
  } else {
    errorField.innerHTML = "Số giờ làm phải từ 80 - 200";
    errorField.style.display = "block";
    errorField.parentElement.querySelector("input").classList.remove("valid");
    return false;
  }
}

// ================================================bk===========
// check chuỗi là email - dùng regex string
function checkEmailValue(value, errorField) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexEmail.test(value);
  if (isValid) {
    // true đúng định dạng
    errorField.innerHTML = "";
    errorField.style.display = "none";
    return true;
  } else {
    errorField.innerHTML = "Vui lòng nhập đúng định dạng email!";
    errorField.style.display = "block";
    return false;
  }
}

// Check số ĐT vietnam
function checkPhoneVietnam(value, errorField) {
  let regexPhoneNumberVietnam =
    /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
  let isValid = regexPhoneNumberVietnam.test(value); //=> true/false
  if (isValid) {
    // đúng chuẩn
    errorField.innerHTML = "";
    errorField.style.display = "none";
    return true;
  } else {
    errorField.innerHTML = "Vui lòng nhập đúng định dạng phone vietnam";
    errorField.style.display = "block";
    return false;
  }
}
