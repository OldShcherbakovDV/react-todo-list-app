import { IToDoListState, ToDoListActionsType } from './types';
import { createToDoItem, insertTodoItem, deleteTodoItemById, setIsDoneById } from './utils';

const initialState: IToDoListState = {
    todoById: {},
    sorting: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ToDoListActionsType.ADD_ITEM: {
            const { text, parrentId } = action.payload;
            const todoItem = createToDoItem(state, text, parrentId);

            return insertTodoItem(state, todoItem);
        }
        case ToDoListActionsType.DELETE_ITEM: {
            const { todoItemId } = action.payload;

            return deleteTodoItemById(state, todoItemId);
        }
        case ToDoListActionsType.SET_IS_DONE: {
            const { todoItemId, isDone } = action.payload;

            return setIsDoneById(state, todoItemId, isDone);
        }
        default:
            return state;
    }
};
