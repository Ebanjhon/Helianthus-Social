import { createContext } from "react";
import { UserResponse } from "../RTKQuery/Slides/types";

type UserAction =
    | { type: 'login'; payload: UserResponse }
    | { type: 'logout' }
    | { type: 'update_avatar'; payload: { avatar: string } };

const UserReducer = (user: UserResponse, action: UserAction) => {
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
                avatar: action.payload.avatar,
            };
        }
        default:
            return user;
    }
}
export default UserReducer

export const UserContext = createContext<{
    user: UserResponse | null;
    dispatch: React.Dispatch<UserAction>;
}>({
    user: null,
    dispatch: () => { },
});