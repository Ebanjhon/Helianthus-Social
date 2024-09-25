const UserReducer = (user, action) => {
    switch (action.type) {
        case "login": {
            return action.payload;
        }
        case "logout": {
            return null;
        }
        case "update_avatar": {
            return {
                ...user,
                avatar: action.payload.avatar, // Cập nhật avatar mới
            };
        }
        default:
            return user;
    }
}

export default UserReducer