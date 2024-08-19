import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { ThemedTextInput } from './ThemedTextInput'

interface InputProps {
    isEdit: boolean,
    setTask: any,
    task: string,
    todoBtn: () => void
}
const TodoInput: React.FC<InputProps> = ({ isEdit, setTask, task, todoBtn }) => {

    
    return (
        <ThemedView darkColor='black' lightColor='transparent'>
            <ThemedTextInput darkColor='white' lightColor='black' style={styles.input} placeholder='Enter Todo' onChangeText={(text) => setTask(text)} value={task} />
            <TouchableOpacity style={styles.button} onPress={todoBtn}>
                <ThemedText darkColor='white' lightColor='black' style={styles.btnContent}>{isEdit ? "Edit Todo" : "Add Todo"}</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    )
}

export default TodoInput

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        fontSize: 18
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 10,
        width: '50%',
        margin: 'auto',
        marginTop: 10,
        borderRadius:5
    },
    btnContent: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
})