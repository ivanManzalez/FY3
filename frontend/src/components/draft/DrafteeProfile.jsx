import React, {useState} from "react";


const DrafteeProfile = (props) => {
  return(
    <button className="draftee_profile" onClick={props.handleDrafteeSelection} value={props.index} key={props.id}  >
      <div className="draftee_profile_pic "> Profile Pic </div>
      <div className="draftee_profile_data">
        <p>@{props.player.last_name }</p>
        {/*<p>Height: {props.player.height_ft + "' " + props.player.height_in+ '"' }</p>
        <p>Weight: {props.player.weight} lbs</p>*/}
      </div>
    </button> 
    )
};

export default DrafteeProfile;