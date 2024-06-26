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
  // method Tổng lương và Xếp loại
  tongLuongNV = () => {
    switch (this.chucvu) {
      case "Sếp":
        return this.luongCB * 3;
        break;
      case "Trưởng phòng":
        return this.luongCB * 2;
        break;
      case "Nhân viên":
        return this.luongCB * 1;
        break;
      case "":
        return this.luongCB * 0;
        break;
    }
  };
  xepLoaiNV = () => {
    // 0 <  gioLam < 160: Trung bình
    // 160 <= gioLam < 176: Khá
    // 176 <= gioLam < 192: Giỏi
    // 192 <= gioLam: Xuất sắc
    if (this.gioLam * 1 >= 80 && this.gioLam * 1 < 160) {
      return "Trung bình";
    } else if (this.gioLam * 1 >= 160 && this.gioLam * 1 < 176) {
      return "Khá";
    } else if (this.gioLam * 1 >= 176 && this.gioLam * 1 < 192) {
      return "Giỏi";
    } else if (this.gioLam * 1 >= 192) {
      return "Xuất sắc";
    } else {
      alert("Giờ làm không đúng!");
      return false;
    }
  };
}
