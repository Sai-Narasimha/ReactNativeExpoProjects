import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'


interface Task {
    id: number,
    value: string
}
interface ListProps {
    tasks: Task[],
    setTask: React.Dispatch<React.SetStateAction<string>>,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setItemIndex: React.Dispatch<React.SetStateAction<number>>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}
const TodoList: React.FC<ListProps> = ({ tasks, setTask, setIsEdit, setItemIndex, setTasks }) => {
    const deleteTodo = (id: number) => {
        setTasks(tasks.filter((task: any) => task.id !== id))
    }
    return (
        <ThemedView darkColor="black" lightColor="transparent"  >
            {tasks.length > 0 ? (
                <FlatList
                    data={tasks}
                    style={{ marginTop: 10, marginVertical: 15 }}
                    keyExtractor={(item: { id: number, value: string }) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <ThemedView style={styles.list}>
                            <ThemedText lightColor="black" darkColor="white" style={styles.listContent}>
                                {item.value}
                            </ThemedText>
                            <View style={styles.flexBox}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setTask(item.value);
                                        setIsEdit(true);
                                        setItemIndex(index);
                                    }}
                                >
                                    <Text style={styles.edit}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                                    <ThemedText style={styles.delete}>Del</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </ThemedView>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
            ) : (
                <ThemedView
                    darkColor="black"
                    lightColor="black"
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}
                >
                    <ThemedText darkColor="red" lightColor="black" style={{ fontSize: 24, fontWeight: 'bold' }}>
                        No Tasks
                    </ThemedText>
                </ThemedView>
            )}
        </ThemedView>
    );

}

export default TodoList

const styles = StyleSheet.create({
    list: {
        padding: 10,
        // backgroundColor: 'skyblue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5
    },
    listContent: {
        fontSize: 18,

    },
    flexBox: {
        width: '25%',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    edit: {
        color: 'green',
        fontSize: 18
    },
    delete: {
        color: 'red',
        fontSize: 18
    }
})