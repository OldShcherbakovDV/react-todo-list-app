import * as React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../state/todoList/actions';
import { Button, Modal } from 'react-bootstrap';

interface IDeleteButtonProps {
    todoItemId: string;
    deleteTodo: (todoItemId: string) => void;
}

const DeleteButton = ({ todoItemId, deleteTodo }: IDeleteButtonProps) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const handleClose = () => setIsVisible(false);
    const handleShow = () => setIsVisible(true);

    const handleAccept = () => {
        deleteTodo(todoItemId);
        handleClose();
    };

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={isVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Attention!</Modal.Title>
                </Modal.Header>
                <Modal.Body>These changes cannot be undone</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAccept}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const mapDispatchToProps = {
    deleteTodo,
};

export default connect(undefined, mapDispatchToProps)(DeleteButton);
