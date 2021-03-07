import * as React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import TodoListItem from '../TodoItem';
import { isTodoItemDone } from '../../state/todoList/utils';

interface ITodoListProps {
    items: string[];
    isDone: (todoItemId: string) => boolean;
}

export const BaseTodoList = ({ items, isDone }: ITodoListProps) => {
    return (
        <ListGroup>
            {items
                .filter((itemId) => !isDone(itemId))
                .map((todoItemId) => (
                    <TodoListItem key={todoItemId} id={todoItemId} />
                ))}
            {items
                .filter((itemId) => isDone(itemId))
                .map((todoItemId) => (
                    <TodoListItem key={todoItemId} id={todoItemId} />
                ))}
        </ListGroup>
    );
};

const mapStateToProps = (state) => ({
    isDone: (todoItemId) => isTodoItemDone(state.todoList, todoItemId),
});

const mapStateToPropsForRoot = (state) => ({
    items: state.todoList.sorting,
    isDone: (todoItemId) => isTodoItemDone(state.todoList, todoItemId),
});

export const TodoList = connect(mapStateToProps)(BaseTodoList);

export default connect(mapStateToPropsForRoot)(BaseTodoList);
