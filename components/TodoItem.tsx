import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface Task {
  id: number;
  value: string;
}

interface TodoItemProps {
  item: Task;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onDelete, onEdit }) => {
  const translateX = useSharedValue(0);

  type ContextType = {
    startX: number;
  };

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      if (Math.abs(event.translationX) > 10) { // Avoid accidental swipes
        translateX.value = ctx.startX + event.translationX;
      }
    },
    onEnd: () => {
      if (translateX.value < -100) { // Adjust this threshold as needed
        onDelete(item.id);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.itemContainer, animatedStyle]}>
        <Text style={styles.itemText}>{item.value}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => onEdit(item.id)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
});

export default TodoItem;
