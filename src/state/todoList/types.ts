export enum ToDoState {
    DONE,
    NOT_DONE,
    MERGE_CHILDREN_VALUES,
}

export interface IToDo {
    id: string;
    text: string;
    state: ToDoState;
    parrentId: string | null;
    childrenIds: string[];
}

export interface IToDoListState {
    todoById: {
        [key: string]: IToDo;
    };
    sorting: string[];
}

export enum ToDoListActionsType {
    ADD_ITEM = 'TO_DO_LIST_ADD_ITEM',
    DELETE_ITEM = 'TO_DO_DELETE_ITEM',
    SET_IS_DONE = 'TO_DO_SET_IS_DONE',
}
