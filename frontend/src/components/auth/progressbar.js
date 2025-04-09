import React, { useState } from 'react';

const ProgressBar = (props) => {

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${props.progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
