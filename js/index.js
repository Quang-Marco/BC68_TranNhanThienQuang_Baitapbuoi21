let arrSinhVien = [];

// Combo 3 trong 1
function renderSaveReset() {
  renderArrSinhVien();
  saveLocalStorage();
  resetForm();
}

// Lấy dữ liệu sinh viên từ form
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLSV input, #formQLSV select");
  let sinhVien = new SinhVien();
  let isValid = true;

  for (let field of arrField) {
    let { value, id } = field;
    sinhVien[id] = value;
    // Gọi tới thẻ cha đang chứa input
    let errorField = field.parentElement.querySelector("span");
    let check = checkEmptyValue(value, errorField);
    // Toán nhị phân
    isValid &= check;

    if (check && id == "txtTenSV") {
      isValid &= checkMinMaxValue(value, errorField, 4, 30);
    }
    if (check && id == "txtEmail") {
      isValid &= checkEmailValue(value, errorField);
      // checkPhoneNumberValue(value, errorField);
    }
    if (check && id == "txtPass") {
      isValid &= checkPassword(value, errorField);
    }
  }
  if (isValid) {
    return sinhVien;
  }
}

// Reset Form
function resetForm() {
  document.getElementById("formQLSV").reset();
  document.getElementById("txtMaSV").readOnly = false;
}

// Thêm sịnh viên vào mảng
document.getElementById("formQLSV").onsubmit = function (e) {
  e.preventDefault();
  let sinhVien = getValueForm();
  if (!sinhVien) {
    return;
  }

  // Thêm sinh viên vào mảng
  arrSinhVien.push(sinhVien);
  renderSaveReset();
};

// Hiển thị dữ liệu sinh viên lên giao diện
function renderArrSinhVien(arr = arrSinhVien) {
  let content = "";
  for (let sinhVien of arrSinhVien) {
    let newArrSinhVien = new SinhVien();
    Object.assign(newArrSinhVien, sinhVien);
    let { txtMaSV, txtTenSV, txtEmail, txtNgaySinh, khSV } = newArrSinhVien;

    content += `
    <tr>
      <td>${txtMaSV}</td>
      <td>${txtTenSV}</td>
      <td>${txtEmail}</td>
      <td>${txtNgaySinh}</td>
      <td>${khSV}</td>
      <td>${newArrSinhVien.tinhDiemTrungBinh()}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteSinhVien('${txtMaSV}')">Xóa</button>
        <button class="btn btn-warning" onclick="getInfoSinhVien('${txtMaSV}')">Sửa</button>
      </td>
    </tr>
    `;
  }
  // DOM tới tbody và hiển thị dữ liệu
  document.getElementById("tbodySinhVien").innerHTML = content;
}

getLocalStorage();

// Lưu trữ dữ liệu xuống local storage
function saveLocalStorage(key = "arrSinhVien", value = arrSinhVien) {
  let stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}

// Lấy dữ liệu từ local storage
function getLocalStorage(key = "arrSinhVien") {
  let arrLocal = localStorage.getItem(key);
  // arrSinhVien = arrLocal ? JSON.parse(arrLocal) : [];
  if (arrLocal) {
    arrSinhVien = JSON.parse(arrLocal);
    renderArrSinhVien();
  }
}

// Chức năng xóa một sinh viên khỏi mảng
function deleteSinhVien(mssv) {
  let index = arrSinhVien.findIndex((item, index) => item.txtMaSV == mssv);
  if (index != -1) {
    arrSinhVien.splice(index, 1);
    renderArrSinhVien();
    saveLocalStorage();
  }
}

// Chức năng lấy thông tin sinh viên
function getInfoSinhVien(mssv) {
  // Đưa dữ liệu SV lên giao diện
  let sinhVien = arrSinhVien.find((item, index) => item.txtMaSV == mssv);
  if (sinhVien) {
    let arrField = document.querySelectorAll(
      "#formQLSV input, #formQLSV select"
    );
    for (let field of arrField) {
      field.value = sinhVien[field.id];
    }
    // Chặn người dùng chỉnh sửa input mã SV
    document.getElementById("txtMaSV").readOnly = true;
  }
}

// Chức năng cập nhật thông tin sinh viên
function updateSinhVien() {
  let sinhVien = getValueForm();
  let index = arrSinhVien.findIndex((item) => item.txtMaSV == sinhVien.txtMaSV);
  if (index != -1) {
    arrSinhVien[index] = sinhVien;
    renderSaveReset();
  }
}

document.querySelector(".btn-info").onclick = updateSinhVien;

// Chức năng tìm kiếm
function searchSinhVien(e) {
  let newKeyWord = removeVietnameseTones(e.target.value.toLowerCase().trim());
  let arrSinhVienFilter = arrSinhVien.filter((item) => {
    let newTenSinhVien = removeVietnameseTones(
      item.txtTenSV.toLowerCase().trim()
    );
    return newTenSinhVien.includes(newKeyWord);
  });
  renderArrSinhVien(arrSinhVienFilter);
}

document.getElementById("txtSearch").oninput = searchSinhVien;
