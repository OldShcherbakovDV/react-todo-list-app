import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { hot } from 'react-hot-loader';
import TodoList from './TodoList';
import AddTodoModal from './AddTodoModal';

const App = () => (
    <Container>
        <Row className="mb-4">
            <Col>
                <h1>You ToDo List:</h1>
            </Col>
        </Row>
        <Row className="mb-4">
            <Col>
                <TodoList />
            </Col>
        </Row>
        <Row md={8}>
            <AddTodoModal />
        </Row>
    </Container>
);

declare let module: Record<string, unknown>;

export default hot(module)(App);
