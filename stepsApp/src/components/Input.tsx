import { FC } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"

interface Props {
    placeholder : string
}


const Input:FC<Props> = ({placeholder}) => {
    return  <TextInput style={styles.input} placeholder={placeholder}></TextInput>
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth:1,
        borderColor: 'black',
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
})

export default Input;