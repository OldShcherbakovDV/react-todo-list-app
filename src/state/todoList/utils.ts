import { IToDo, IToDoListState, ToDoState } from './types';
import { v4 as uuid4 } from 'uuid';

class ToDoListError extends Error {
    constructor(methodName, description) {
        super(`Error in method: ${methodName}. ${description}`);
        this.name = 'ToDoListError';
    }
}

export const MAX_TREE_DEPTH = 3;

export const createToDoItem = (state: IToDoListState, text: string, parrentId: string | null): IToDo => {
    if (parrentId !== null && !state.todoById[parrentId]) {
        throw new ToDoListError('getPathToRoot', 'Invalid parrentId');
    }

    return {
        id: uuid4(),
        text: text,
        state: ToDoState.NOT_DONE,
        parrentId: parrentId,
        childrenIds: [],
    };
};

export const getPathToRoot = (state: IToDoListState, todoItemId: string): string[] => {
    const item = state.todoById[todoItemId];

    if (!item) {
        throw new ToDoListError('getPathToRoot', 'Invalid item id in');
    }

    const pathToRoot = [todoItemId];
    let nextItemId = item.parrentId;

    while (nextItemId !== null) {
        if (pathToRoot.includes(nextItemId)) {
            throw new ToDoListError('getPathToRoot', 'Infinite loop detected');
        }

        if (!state.todoById[nextItemId]) {
            throw new ToDoListError('getPathToRoot', 'Invalid item id in path');
        }

        pathToRoot.push(nextItemId);
        nextItemId = state.todoById[nextItemId].parrentId;
    }

    return pathToRoot;
};

export const insertTodoItem = (state: IToDoListState, todoItem: IToDo): IToDoListState => {
    if (todoItem.parrentId === null) {
        return {
            todoById: {
                ...state.todoById,
                [todoItem.id]: todoItem,
            },
            sorting: [...state.sorting, todoItem.id],
        };
    }

    const parrent = state.todoById[todoItem.parrentId];

    if (!parrent) {
        throw new ToDoListError('insertTodoItem', 'Invalid parrentId');
    }
    if (getPathToRoot(state, parrent.id).length >= MAX_TREE_DEPTH) {
        throw new ToDoListError('insertTodoItem', 'Exceeding the maximum nesting depth');
    }

    return {
        ...state,
        todoById: {
            ...state.todoById,
            [todoItem.id]: todoItem,
            [parrent.id]: {
                ...parrent,
                state: ToDoState.MERGE_CHILDREN_VALUES,
                childrenIds: [...parrent.childrenIds, todoItem.id],
            },
        },
    };
};

export const isTodoItemDone = (state: IToDoListState, todoItemId: string): boolean => {
    const item = state.todoById[todoItemId];
    if (!item) {
        throw new ToDoListError('isTodoItemDone', 'Invalid item id');
    }

    switch (item.state) {
        case ToDoState.DONE:
            return true;
        case ToDoState.NOT_DONE:
            return false;
        case ToDoState.MERGE_CHILDREN_VALUES:
            for (const childId of item.childrenIds) {
                if (!isTodoItemDone(state, childId)) {
                    return false;
                }
            }
            return true;
    }
};

export const deleteTodoItemById = (state: IToDoListState, todoItemId: string, checkParrent = true): IToDoListState => {
    const item = state.todoById[todoItemId];

    if (!item) {
        throw new ToDoListError('deleteTodoItemById', 'Invalid item id');
    }

    if (!isTodoItemDone(state, todoItemId)) {
        throw new ToDoListError('deleteTodoItemById', 'Not done TODO');
    }

    const { [todoItemId]: _, ...anyItemIds } = state.todoById;
    let nextSortingState;
    let nextTodoById;

    if (checkParrent && item.parrentId !== null) {
        nextSortingState = state.sorting;
        nextTodoById = {
            ...anyItemIds,
            [item.parrentId]: {
                ...anyItemIds[item.parrentId],
                childrenIds: anyItemIds[item.parrentId].childrenIds.filter((id) => todoItemId !== id),
            },
        };
    } else {
        nextSortingState = state.sorting.filter((id) => id !== todoItemId);
        nextTodoById = anyItemIds;
    }

    let nextState = {
        todoById: nextTodoById,
        sorting: nextSortingState,
    };

    if (item.childrenIds.length) {
        for (const childId of item.childrenIds) {
            nextState = deleteTodoItemById(nextState, childId, false);
        }
    }

    return nextState;
};

export const setIsDoneById = (state, todoItemId, isDone) => {
    const item = state.todoById[todoItemId];

    if (!item) {
        throw new ToDoListError('setIsDoneById', 'Invalid item id');
    }

    if (item.childrenIds.length) {
        let nextState = {
            ...state,
        };

        for (const childId of item.childrenIds) {
            nextState = setIsDoneById(nextState, childId, isDone);
        }

        return nextState;
    }

    return {
        ...state,
        todoById: {
            ...state.todoById,
            [todoItemId]: {
                ...item,
                state: isDone ? ToDoState.DONE : ToDoState.NOT_DONE,
            },
        },
    };
};

export const canAddItemToParrent = (state, parrentId) => {
    return getPathToRoot(state, parrentId).length < MAX_TREE_DEPTH;
};
