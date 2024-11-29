import React from 'react';

const AlertMessage = ({ message, type, onClose }) => {
    // Styling based on the alert type (success or error)
    const alertStyles = type === 'success'
        ? 'bg-green-500 text-white'
        : 'bg-red-500 text-white';

    return (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-md shadow-lg max-w-md w-full ${alertStyles}`}>
            <div className="flex justify-between items-center">
                <p className="font-semibold">{message}</p>
                <button
                    onClick={onClose}
                    className=" font-bold bg-transparent text-black rounded-full p-1"
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default AlertMessage;
