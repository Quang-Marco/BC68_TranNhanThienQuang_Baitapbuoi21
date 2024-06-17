class NhanVien {
  constructor() {
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = "";
    this.chucvu = "";
    this.gioLam = "";
  }
  tinhTongLuong = function () {
    if (this.chucvu == "boss") {
      return this.luongCB * 3;
    } else if (this.chucvu == "manager") {
      return this.luongCB * 2;
    } else if (this.chucvu == "staff") {
      return this.luongCB;
    }
  };
  xepLoaiNhanVien = function () {
    if (this.gioLam >= 192) {
      return "xuất sắc";
    } else if (this.gioLam < 192 && this.gioLam >= 176) {
      return "giỏi";
    } else if (this.gioLam < 176 && this.gioLam >= 160) {
      return "khá";
    } else {
      return "trung bình";
    }
  };
}
