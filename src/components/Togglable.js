import React, { useState } from 'react';

const Togglable = (props) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => setVisible(!visible);

	const showWhenVisible = { display: visible ? '' : 'none' };
	const hideWhenVisible = { display: visible ? 'none' : '' };

	return (
		<div className="togglableComponent">
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div className="showWhenVisible" style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>{props.secondButtonLabel || 'Cancel'}</button>
			</div>
		</div>
	);
};

export default Togglable;

// const Togglable = (props) => {
//   const [visible, setVisible] = useState(false)

//   const hideWhenVisible = { display: visible ? 'none' : '' }
//   const showWhenVisible = { display: visible ? '' : 'none' }

//   const toggleVisibility = () => {
//     setVisible(!visible)
//   }

//   return (
//     <div>
//       <div style={hideWhenVisible}>
//         <button onClick={toggleVisibility}>{props.buttonLabel}</button>
//       </div>
//       <div style={showWhenVisible}>
//         {props.children}
//         <button onClick={toggleVisibility}>cancel</button>
//       </div>
//     </div>
//   )
// }

// export default Togglable
