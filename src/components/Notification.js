import React from 'react';

const Notification = ({ notification, error }) => {
	if (error) {
		return <div className="error">{error}</div>;
	}
	if (notification) {
		return <div className="notification">{notification}</div>;
	}
	return null;
};

export default Notification;
