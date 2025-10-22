import React, { useState, useEffect } from 'react';
import './Notification.css';

export const Notification = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => onClose && onClose(), 300);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className={`notification ${type} ${isVisible ? 'visible' : ''}`}>
            <div className="notification-content">
                <span className="notification-icon">
                    {type === 'success' && '✓'}
                    {type === 'error' && '✗'}
                    {type === 'warning' && '⚠'}
                    {type === 'info' && 'ℹ'}
                </span>
                <span className="notification-message">{message}</span>
                <button className="notification-close" onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onClose && onClose(), 300);
                }}>
                    ×
                </button>
            </div>
        </div>
    );
};
