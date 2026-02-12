import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Alert(props) {
    const[alertMessage, setAlertMessage] = React.useState("");

    function showAlert(message) {
        setAlertMessage(message);
    }

    return (
        <div>
            <ToastContainer position='top-end' className='p-3 bg-alert'>
                <Toast.Header>
                    <strong className="me-auto">Alert</strong>
                </Toast.Header>
                <Toast.Body>{alertMessage}</Toast.Body>
            </ToastContainer>
        </div>
    );
}
