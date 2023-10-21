import React, { useState, useRef } from "react";

const ActionButton = ({title, path}) => {
  return(
      <a href={path}>
        <button className="action_button clickable" >
        {title}
        </button>
      </a>
    )
}

export default ActionButton;