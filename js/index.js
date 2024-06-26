// Mảng chứa toàn bộ nhân viên
let arrNhanVien = [];

// Lấy thông tin NV từ form
function getValueFormNV(nguonChayHam) {
  let isValid = true;
  let nhanVien = new NhanVien();
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");

  for (let field of arrField) {
    let { id, value } = field;
    nhanVien[id] = value;
    let errorField =
      field.parentElement.parentElement.querySelector("span.sp-thongbao");
    let check = checkEmptyValue(value, errorField);
    isValid &= check;

    // check tknv và email trùng (chỉ chạy cho riêng case thêm mới NV)
    if (nguonChayHam == "NEW_NV") {
      for (let oldNhanVien of arrNhanVien) {
        if (value == oldNhanVien.tknv) {
          // alert("trùng tknv");
          errorField.innerHTML = "Tài khoản này đã tồn tại!";
          errorField.style.display = "block";
          errorField.parentElement
            .querySelector("input")
            .classList.remove("valid");
          isValid &= false;
        }
        if (value == oldNhanVien.email) {
          // alert("trùng email");
          errorField.innerHTML = "Email này đã tồn tại!";
          errorField.style.display = "block";
          errorField.parentElement
            .querySelector("input")
            .classList.remove("valid");
          isValid &= false;
        }
      }
    }

    if (check) {
      isValid &= field.classList.contains("valid");
    }

    // EOF =====[Validate dữ liệu]=====
  }

  if (isValid) {
    return nhanVien;
  } else {
    return null;
  }
}

// Combo 3 trong 1: render, lưu local storage & reset form
function renderSaveReset() {
  renderArrNhanVien();
  saveLocalStorage();
  resetFormModal();
}

// Thêm Nhân viên mới
document.getElementById("formQLNV").addEventListener("submit", (event) => {
  event.preventDefault(); //ngăn reload
  let nhanVien = getValueFormNV("NEW_NV");
  if (!nhanVien) {
    return;
  } else {
    arrNhanVien.push(nhanVien);
    //hiển thị - lưu database - clear form
    renderSaveReset();
  }
});

// Hiển thị dữ liệu lên table
function renderArrNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    let newArrNhanVien = new NhanVien(); // để tránh thay đổi mảng gốc arrNhanVien -> sd được các phương thức trong lớp đối tượng
    Object.assign(newArrNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu } = newArrNhanVien;
    content += `
    <tr>
      <td>${tknv}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${datepicker}</td>
      <td>${chucvu}</td>
      <td>${vnd(newArrNhanVien.tongLuongNV())}</td>
      <td>${newArrNhanVien.xepLoaiNV()}</td>
      <td>
        <button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger">Xoá</button>
        <button onclick="getInfoNhanVien('${tknv}')" class="btn btn-warning">Sửa</button>
      </td>
    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

// Lưu local Storage
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let stringJSON = JSON.stringify(value);
  localStorage.setItem(key, stringJSON);
}

getLocalStorage(); // lấy dữ liệu khi reload trang

// Lấy dữ liệu từ local storage
function getLocalStorage(key = "arrNhanVien") {
  let arrLocal = localStorage.getItem(key);
  if (arrLocal) {
    arrNhanVien = JSON.parse(arrLocal);
    renderArrNhanVien();
  }
}

// Xóa nhân viên
function deleteNhanVien(maNhanVien) {
  let text = `Bạn có chắc muốn xóa nhân viên [${maNhanVien}] khỏi danh sách?`;
  if (confirm(text) == true) {
    let index = arrNhanVien.findIndex((item) => {
      return item.tknv == maNhanVien;
    });
    arrNhanVien.splice(index, 1); // xóa nhanVien ở vị trí index
    renderSaveReset();
  } else {
    return false;
  }
}

// =========[Chỉnh sửa thông tin NV]=========
// Lấy thông tin nhân viên cần sửa
function getInfoNhanVien(maNhanVien) {
  // tìm đối tượng nhanVien cần sửa
  let nhanVienSua = arrNhanVien.find((item) => {
    return item.tknv == maNhanVien;
  });
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  for (let field of arrField) {
    let { id, value } = field; // = nhanVienSua{itemName : value}
    field.value = nhanVienSua[id];

    //set các field về trạng thái dữ liệu hợp lệ
    field.classList.add("valid");
  }
  // show modal
  $("#myModal").modal("show");

  // chặn người dùng chỉnh sửa input tknv
  document.getElementById("tknv").readOnly = true;
  // chặn người dùng click nút thêm nhân viên
  document.getElementById("btnThemNV").disabled = true;
  // Bỏ chặn click nút cập nhật
  document.getElementById("btnCapNhat").disabled = false;
}

// Cập nhật thông tin nhân viên
function updateNhanVien() {
  // lấy dữ liệu từ form
  let nhanVien = getValueFormNV("UPDATE_NV");
  // Kiểm tra xem nhanVien có hợp lệ không
  if (!nhanVien) {
    return;
  }

  let index = arrNhanVien.findIndex((item) => {
    return item.tknv == nhanVien.tknv;
  });
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderSaveReset();
    // hide modal
    $("#myModal").modal("hide");
  }
}
document.getElementById("btnCapNhat").onclick = updateNhanVien;
// EOF =====[Chỉnh sửa thông tin NV]=====

document.getElementById("btnDong").onclick = resetFormModal;
document.getElementById("btnThem").onclick = () => {
  resetFormModal();
  // chặn click nút cập nhật
  document.getElementById("btnCapNhat").disabled = true;
};

// Search nhân viên
function searchNhanVien(event) {
  let newArrNhanVien = [];
  for (let nhanVien of arrNhanVien) {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    newArrNhanVien.push(newNhanVien);
  }

  let keyword = removeVietnameseTones(event.target.value.toLowerCase().trim());
  let arrNhanVienFilter = newArrNhanVien.filter(function (item, index) {
    let xepLoai = removeVietnameseTones(item.xepLoaiNV().toLowerCase().trim());
    return xepLoai.includes(keyword);
  });
  // hiển thị lên giao diện danh sách đã lọc
  renderArrNhanVien(arrNhanVienFilter);
}
document.getElementById("searchXepLoai").oninput = searchNhanVien;
