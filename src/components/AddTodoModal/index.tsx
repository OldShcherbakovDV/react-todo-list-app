import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Dropdown, InputGroup, FormControl, Row, Col, Alert } from 'react-bootstrap';
import { addTodo } from '../../state/todoList/actions';
import { IToDoListState } from '../../state/todoList/types';
import { canAddItemToParrent } from '../../state/todoList/utils';

interface IAddTodoModalProps {
    todoList: IToDoListState;
    addTodo: (text: string, parrentId: string) => void;
    canAddItemToParrent: (parrentId: string) => boolean;
}

const AddToDoModal = ({ todoList, addTodo, canAddItemToParrent }: IAddTodoModalProps) => {
    const { todoById } = todoList;
    const [isVisible, setIsVisible] = React.useState(true);
    const [selectedParrentId, setSelectedParrentId] = React.useState(null);
    const [title, setTitle] = React.useState('');

    const handleClose = () => {
        setIsVisible(false);
        setSelectedParrentId(null);
        setTitle('');
    };
    const handleShow = () => setIsVisible(true);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleSelect = (id) => setSelectedParrentId(id);

    const handleAdd = () => {
        addTodo(title, selectedParrentId);
        handleClose();
    };

    const isValidData = title.length && (selectedParrentId === null || canAddItemToParrent(selectedParrentId));
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add ToDo
            </Button>

            <Modal show={isVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new ToDo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!isValidData && (
                        <Row className="mb-2">
                            <Col>
                                <Alert variant="danger">Can&apos;t add ToDo with current Params</Alert>
                            </Col>
                        </Row>
                    )}
                    <Row className="mb-2">
                        <Col>
                            <label>Select Parrent ToDo</label>
                        </Col>
                        <Col>
                            <Dropdown onSelect={handleSelect}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {!selectedParrentId ? 'Root' : todoById[selectedParrentId].text}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item key="modal-dropdown-null" eventKey={null}>
                                        Root
                                    </Dropdown.Item>
                                    {Object.values(todoById).map((todo) => (
                                        <Dropdown.Item key={`modal-dropdown-${todo.id}`} eventKey={todo.id}>
                                            {todo.text}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="new-todo-title">Title</label>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl id="new-todo-title" onChange={handleTitleChange} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd} disabled={!isValidData}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    todoList: state.todoList,
    canAddItemToParrent: (parrentId: string) => canAddItemToParrent(state.todoList, parrentId),
});

const mapDispatchToProps = {
    addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToDoModal);
