function validateInputs() {
    let newErrors = {};

    if (userName.length === 0) {
        newErrors.userName = 'Không được để trống tên người dùng!';
    }

    if (hasWhitespace(userName)) {
        newErrors.userName = 'Tên người dùng không được chứa khoảng trắng!';
    }

    if (firstName.length === 0) {
        newErrors.firstName = 'Không được để trống mục này!';
    }

    if (!validateEmail(email)) {
        newErrors.email = 'Email nhập chưa chính xác!';
    }

    if (email.length === 0) {
        newErrors.email = 'Email không được bỏ trống!';
    }

    if (password !== passConfirm) {
        newErrors.pass1 = 'Mật khẩu không khớp!';
        newErrors.pass2 = 'Mật khẩu không khớp!';
    }

    if (password.length === 0) {
        newErrors.pass1 = 'Vui lòng nhập mật khẩu!';
    }

    if (passConfirm.length === 0) {
        newErrors.pass2 = 'Vui lòng nhập mật khẩu!';
    }

    if (selectedDate === null) {
        newErrors.birth = 'Vui lòng chọn ngày sinh!';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
        return true;
    }
    return false;
}