let arrNhanVien = [];

// Combo 3 trong 1
function renderSaveReset() {
  renderArrNhanVien();
  saveLocalStorage();
  resetForm();
}

// Lấy dữ liệu nhân viên từ form
function getValueForm() {
  let arrField = document.querySelectorAll(
    ".input-group input, .input-group select"
  );
  let nhanVien = new NhanVien();
  let isValid = true;

  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;
    // Gọi tới thẻ cha đang chứa input
    let errorField = field.parentElement.querySelector("span");
    let check = checkEmptyValue(value, errorField);
    // Toán nhị phân
    isValid &= check;

    if (check && id == "name") {
      isValid &= checkMinMaxValue(value, errorField, 4, 30);
    }
    if (check && id == "email") {
      isValid &= checkEmailValue(value, errorField);
      // checkPhoneNumberValue(value, errorField);
    }
    if (check && id == "password") {
      isValid &= checkPassword(value, errorField);
    }
  }
  if (isValid) {
    return nhanVien;
  }
}

// Reset Form
function resetForm() {
  document.getElementById("formQLNV").reset();
  document.getElementById("tknv").readOnly = false;
}

// Thêm sịnh viên vào mảng
document.getElementById("btnThemNV").onclick = function () {
  let nhanVien = getValueForm();
  if (!nhanVien) {
    return;
  }
  // Thêm nhân viên vào mảng
  arrNhanVien.push(nhanVien);
  renderSaveReset();
};

// Hiển thị dữ liệu nhân viên lên giao diện
function renderArrNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arrNhanVien) {
    let newArrNhanVien = new NhanVien();
    Object.assign(newArrNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu } = newArrNhanVien;

    content += `
    <tr>
      <td>${tknv}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${datepicker}</td>
      <td>${chucvu}</td>
      <td>${newArrNhanVien.tinhTongLuong()}</td>
      <td>${newArrNhanVien.xepLoaiNhanVien()}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteNhanVien('${tknv}')">Xóa</button>
        <button class="btn btn-warning" onclick="getInfoNhanVien('${tknv}')">Sửa</button>
      </td>
    </tr>
    `;
  }
  // DOM tới tbody và hiển thị dữ liệu
  document.getElementById("tableDanhSach").innerHTML = content;
}

getLocalStorage();

// Lưu trữ dữ liệu xuống local storage
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}

// Lấy dữ liệu từ local storage
function getLocalStorage(key = "arrNhanVien") {
  let arrLocal = localStorage.getItem(key);
  // arrNhanVien = arrLocal ? JSON.parse(arrLocal) : [];
  if (arrLocal) {
    arrNhanVien = JSON.parse(arrLocal);
    renderArrNhanVien();
  }
}

// Chức năng xóa một nhân viên khỏi mảng
function deleteNhanVien(mssv) {
  let index = arrNhanVien.findIndex((item, index) => item.tknv == mssv);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderArrNhanVien();
    saveLocalStorage();
  }
}

// Chức năng lấy thông tin nhân viên
function getInfoNhanVien(mssv) {
  // Đưa dữ liệu SV lên giao diện
  let nhanVien = arrNhanVien.find((item, index) => item.tknv == mssv);
  if (nhanVien) {
    let arrField = document.querySelectorAll(
      "#formQLNV input, #formQLNV select"
    );
    for (let field of arrField) {
      field.value = nhanVien[field.id];
    }
    // Chặn người dùng chỉnh sửa input mã SV
    document.getElementById("tknv").readOnly = true;
  }
}

// Chức năng cập nhật thông tin Nhan viên
function updateNhanVien() {
  let nhanVien = getValueForm();
  let index = arrNhanVien.findIndex((item) => item.tknv == nhanVien.tknv);
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderSaveReset();
  }
}

document.getElementById("btnCapNhat").onclick = updateNhanVien;

// Chức năng tìm kiếm
function searchNhanVien(e) {
  let newKeyWord = removeVietnameseTones(e.target.value.toLowerCase().trim());
  let arrNhanVienFilter = arrNhanVien.filter((item) => {
    let newTenNhanVien = removeVietnameseTones(item.name.toLowerCase().trim());
    return newTenNhanVien.includes(newKeyWord);
  });
  renderArrNhanVien(arrNhanVienFilter);
}

document.getElementById("btnTimNV").oninput = searchNhanVien;
