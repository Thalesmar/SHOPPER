import React, { useState, useEffect } from 'react';

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

    const getBgColor = () => {
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'error': return 'bg-red-500';
            case 'warning': return 'bg-yellow-500';
            case 'info': default: return 'bg-blue-500';
        }
    };

    return (
        <div className={`fixed top-5 right-5 min-w-[300px] p-4 rounded-lg shadow-lg text-white z-50 transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} ${getBgColor()}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-xl">
                        {type === 'success' && '✓'}
                        {type === 'error' && '✗'}
                        {type === 'warning' && '⚠'}
                        {type === 'info' && 'ℹ'}
                    </span>
                    <span className="text-sm font-medium">{message}</span>
                </div>
                <button className="bg-transparent border-none text-white text-xl cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onClose && onClose(), 300);
                }}>
                    ×
                </button>
            </div>
        </div>
    );
};
