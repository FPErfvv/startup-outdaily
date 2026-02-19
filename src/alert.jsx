import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useUser } from './UserContext';

export function Alert(props) {
    const { alertMessage, setAlertMessage } = useUser();

    return (
        <ToastContainer position='middle-center' className='p-3 bg-danger border border-3 rounded-3 border-dark' style={
            { zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',}
            }>
            <Toast onClose={() => setAlertMessage('')}>
                <Toast.Header>
                    <strong className="me-auto shadow">Error</strong>
                </Toast.Header>
                <Toast.Body>{alertMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
