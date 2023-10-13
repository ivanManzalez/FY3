import React, { useState } from "react";
import CreatePlayerForm from "./CreatePlayerForm";
import CreateTeamForm from "./CreateTeamForm";
import CreateSeasonForm from "./CreateSeasonForm";
import Api from "./Api";
import Draft from "../draft/Draft";
import {getDraftees} from "../api/player/player";
import {retrieveAllTeams} from "../api/team/team";

//////////////////////////////////////////////////////////////////////// 
const Commssioner = () => {
  const [beginDraft, setBeginDraft] = useState(false);
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [teamsList, setTeamsList] = useState([]);

  const getAvailablePlayers = async () => {
    const drafteeResponse = await getDraftees();
    handleMessage(drafteeResponse)
    setAvailablePlayers(drafteeResponse.data);

  }

  const getTeams = async () => {
    const drafterResponse = await retrieveAllTeams();
    console.log(drafterResponse)
    handleMessage(drafterResponse)
    setTeamsList(drafterResponse.data)
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
    await getTeams();
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
