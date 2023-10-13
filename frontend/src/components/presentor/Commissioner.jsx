import React, { useState } from "react";
import CreatePlayerForm from "./CreatePlayerForm";
import CreateTeamForm from "./CreateTeamForm";
import CreateSeasonForm from "./CreateSeasonForm";
import Api from "./Api";
import Draft from "../draft/Draft";
import {getDraftees} from "../api/player/player";

//////////////////////////////////////////////////////////////////////// 
  
const teamsList = {
  Pick01:{
    id:1,
    name:"Team One",
  },
  Pick02:{
    id:2,
    name:"Team Two",
  },
  Pick03:{
    id:3,
    name:"Team Three",
  },
  Pick04:{
    id:4,
    name:"Team Four",
  },
  Pick05:{
    id:5,
    name:"Team Five",
  },
  Pick06:{
    id:6,
    name:"Team Five",
  },
  Pick07:{
    id:7,
    name:"Team Four",
  },
  Pick08:{
    id:8,
    name:"Team Three",
  },
  Pick09:{
    id:9,
    name:"Team Two",
  },
  Pick10:{
    id:10,
    name:"Team One",
  },
}

////////////////////////////////////////////////////////////////////////
const Commssioner = () => {
  const [beginDraft, setBeginDraft] = useState(false);
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);

  const getAvailablePlayers = async () => {
    const drafteeResponse = await getDraftees();
    handleMessage(drafteeResponse)
    setAvailablePlayers(drafteeResponse.data);
  }

  const handleMessage = (response) => {
    if(response.status == 200){
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };
  const beginDraftButtonHandler = async () => {
    setBeginDraft(true);
    await getAvailablePlayers();
  };

  return (
    <div id='commissioner'>
      {/*< Api />*/}
      <h1>Commssioner</h1>
      <div className="h_container" >
        {!beginDraft && <button className="submit" type='submit' onClick={beginDraftButtonHandler}> Begin Draft </button>}
        <div id="message" className={classname} >{message && <p>{message}</p>}</div>
        {
        beginDraft &&
        < Draft continueDraft={setBeginDraft} messageHandler={handleMessage} availablePlayers={availablePlayers}  teamsList={teamsList} />
        }
        < CreatePlayerForm />
        < CreateSeasonForm />
        < CreateTeamForm />
        
      </div>
    </div>
  )
}
export default Commssioner;
