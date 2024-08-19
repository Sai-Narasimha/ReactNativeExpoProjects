import { View, Text, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import TodoInput from '@/components/TodoInput'
import TodoList from '@/components/TodoList'

interface Task {
    id: number,
    value: string
}
const todo = () => {

    const [task, setTask] = useState<string>('')

    const [tasks, setTasks] = useState<Task[]>([])

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [itemIndex, setItemIndex] = useState<number>(-1)

    const addTodo = () => {
        if (task.length > 0) {
            const newTask: Task = { id: Date.now(), value: task };
            setTasks((prevTask) => [...prevTask, newTask])
            setTask('')
        }
    }

    const editTodo = (index: number) => {
        const updatedTasks = tasks.map((t, i) => 
          i === index ? { ...t, value: task } : t
        );
        setTasks(updatedTasks);
        setIsEdit(false);
        setTask('');
      };

    const todoBtn = () => {
        if (isEdit) {
            editTodo(itemIndex)
        }
        else addTodo()
    }

    return (
        <SafeAreaView style={styles.container}>
            <TodoInput isEdit={isEdit} setTask={setTask} task={task} todoBtn={todoBtn} />
            <TodoList tasks={tasks} setTask={setTask} setIsEdit={setIsEdit} setItemIndex={setItemIndex} setTasks={setTasks} />
        </SafeAreaView>
    )
}

export default todo

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})