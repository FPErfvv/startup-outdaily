import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export function Alert(props) {
    const [alertMessage, setMessage] = React.useState("");

    function onAlertHide() {
        setMessage("");
    }

    function setAlertMessage(message) {
        setMessage(message);
    }

    

    return (
        <ToastContainer position='middle-center' className='p-3 bg-success border border-3' style={
            { zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',}
            }>
            <Toast onClose={() => onAlertHide()}>
                <Toast.Header>
                    <strong className="me-auto">Alert</strong>
                </Toast.Header>
                <Toast.Body>{alertMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
