import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    HomeTabs: undefined;
    Home: undefined;
    Setting: undefined;
    Profile: { userId: string };
    UpdateProfile: undefined;
    Message: undefined;
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    Active: undefined;
    Chat: undefined;
};


export type ScreenProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
};