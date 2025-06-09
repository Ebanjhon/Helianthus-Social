import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserResponse } from "../../RTKQuery/Slides/types";

export type RootStackParamList = {
    HomeTabs: undefined;
    Home: undefined;
    Setting: undefined;
    Profile: { usernameProps: string };
    UpdateProfile: undefined;
    Message: undefined;
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    Active: { userData: UserResponse };
    Chat: undefined;
};


export type ScreenProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
};