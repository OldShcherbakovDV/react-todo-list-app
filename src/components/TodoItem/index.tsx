import * as React from 'react';
import { connect } from 'react-redux';
import { ListGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { TodoList } from '../TodoList';
import DeleteButton from '../DeleteButton';
import { isTodoItemDone } from '../../state/todoList/utils';
import { setIsDone } from '../../state/todoList/actions';
import { IToDo } from '../../state/todoList/types';

interface ITodoListItemProps {
    id: string;
    isDone: (todoItemId: string) => boolean;
    setIsDone: (todoItemId: string, isDone: boolean) => void;
    todoById: { [key: string]: IToDo };
    addTodo: (text: string, parrentId: string) => void;
}

const TodoListItem = ({ todoById, id, isDone, setIsDone }: ITodoListItemProps) => {
    const item = todoById[id];
    const checked = isDone(id);
    const handleSetChecked = () => setIsDone(id, !checked);

    return (
        <ListGroup.Item>
            <Row className="align-items-center">
                <Form.Check checked={checked} label={item.text} onClick={handleSetChecked} className="ml-4 mr-4" />
                {checked && <DeleteButton todoItemId={id} />}
            </Row>

            {item.childrenIds && (
                <Row className="mt-2">
                    <Col>
                        <TodoList items={item.childrenIds} />
                    </Col>
                </Row>
            )}
        </ListGroup.Item>
    );
};

const mapStateToProps = (state) => ({
    todoById: state.todoList.todoById,
    isDone: (id) => isTodoItemDone(state.todoList, id),
});

const mapDispatchToProps = {
    setIsDone,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);
