import { ToDoListActionsType } from './types';

export const addTodo = (text: string, parrentId: string) => ({
    type: ToDoListActionsType.ADD_ITEM,
    payload: {
        text,
        parrentId,
    },
});

export const setIsDone = (todoItemId: string, isDone) => ({
    type: ToDoListActionsType.SET_IS_DONE,
    payload: {
        todoItemId,
        isDone,
    },
});

export const deleteTodo = (todoItemId: string) => ({
    type: ToDoListActionsType.DELETE_ITEM,
    payload: {
        todoItemId,
    },
});
