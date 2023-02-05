import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import EncryptedStorage from "react-native-encrypted-storage";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../action/registrationAction";



const MainScreen = () =>{
const dispatch = useDispatch()
    const checkStore = async () => {
        const value = await EncryptedStorage.getItem('user_session');
        console.log(value, 'check')
        dispatch(logOutAction())
    }

    return <SafeAreaView><Text>Main scren</Text><TouchableOpacity onPress={checkStore}><Text>LogOut</Text></TouchableOpacity></SafeAreaView>
}

export default MainScreen;