import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../assets/color/colors";
import { useContext, useState } from "react";
import { UserContext } from "../../Configs/Context";
import icons from "../../assets/iconApp/icons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const UpdateProfile = () => {
    const [user, dispatchUser] = useContext(UserContext);
    const [username, setUserName] = useState(user.username);
    const [firstname, setFirstName] = useState(user.firstName);
    const [lastname, setLastName] = useState(user.lastName);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState(user.gender);
    const [birth, setBirth] = useState(user);
    const [avatar, setAvatar] = useState(user.avatar);


    const openImageLibrary = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error) {
                setAvatar(response.assets[0].uri);
            }
        });
    };

    // Mở camera
    const moCam = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error) {
                console.log(response.assets[0].uri);
            }
        });
    };

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={{ width: 130, height: 130, borderRadius: 3, borderRadius: 100, borderColor: colors.info, borderWidth: 4 }}
                    source={{
                        uri: avatar === ""
                            ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                            : avatar
                    }} />

                <TouchableOpacity
                    onPress={openImageLibrary}
                    style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                >
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={{ uri: icons.camera }}
                    />
                    <Text style={styles.title}>Chọn ảnh đại diện</Text>
                </TouchableOpacity>


                <View style={{ width: '90%', marginBottom: 10 }}>
                    <Text style={styles.title}>Tên</Text>
                    <View style={styles.contain_item}>
                        <TextInput
                            value={firstname}
                            onChange={() => setFirstName}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={{ width: '90%', marginBottom: 10 }}>
                    <Text style={styles.title}>Họ</Text>
                    <View style={styles.contain_item}>
                        <TextInput
                            value={lastname}
                            onChange={() => setLastName}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={{ width: '90%', marginBottom: 10 }}>
                    <Text style={styles.title}>Email</Text>
                    <View style={styles.contain_item}>
                        <TextInput
                            value={email}
                            onChange={() => setEmail}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={{ width: '90%', marginBottom: 10 }}>
                    <Text style={styles.title}>Số điện thoại</Text>
                    <View style={styles.contain_item}>
                        <TextInput
                            value={phone}
                            onChange={() => setPhone}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={{ width: '90%', marginBottom: 10 }}>
                    <Text style={styles.title}>Ngày sinh</Text>
                    <View style={styles.contain_item}>
                        <TextInput
                            value={birth}
                            onChange={() => setBirth}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={{ width: '90%', marginBottom: 10 }}>
                    <Text style={styles.title}>Giới tính</Text>
                    <View style={styles.contain_item}>
                        <TextInput
                            value={gender}
                            onChange={() => setGender}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={{ width: '90%', height: 90, backgroundColor: colors.info }}>
                    <View style={styles.contain_item}>
                        {/* <Button>Cập nhật thông tin</Button> */}
                    </View>
                </View>

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',

    },
    contain_item: {
        width: '100%',
        height: "auto",
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.dark,

    },
    input: {
        fontSize: 18,
        fontWeight: '500',
        paddingLeft: 16,
    }
});
export default UpdateProfile