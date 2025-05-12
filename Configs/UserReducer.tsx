import { createContext } from "react";
import { UserResponse } from "../RTKQuery/Slides/types";

type UserAction =
    | { type: 'login'; payload: UserResponse }
    | { type: 'logout' }
    | { type: 'update_avatar'; payload: { avatar: string } };

const UserReducer = (user: UserResponse | null, action: UserAction): UserResponse | null => {
    switch (action.type) {
        case "login": {
            return action.payload;
        }
        case "logout": {
            return null;
        }
        case "update_avatar": {
            if (!user) return null;
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