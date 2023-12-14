import React, { useState, useRef } from "react";

const ActionButton = ({title, path,imgSrc}) => {
  return(
      <a href={path}>
        <button className="action_button clickable" >
          <img src={imgSrc} alt={"go to "+title}></img>
        {title}
        </button>
      </a>
    )
}

export default ActionButton;