import React, { useState } from 'react';

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dropdown-item ${isOpen ? 'active' : ''}`}>
      <div className="dropdown-title" onClick={() => setIsOpen(!isOpen)}>
        <h2>{props.title}</h2>
        <svg
          className="dropdown-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <div className="dropdown-content">
        <p>{props.content}</p>
      </div>
    </div>
  );
}

export default Dropdown;
