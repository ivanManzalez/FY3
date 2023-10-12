import React, { useState } from "react";
import CreatePlayerForm from "./CreatePlayerForm";
import CreateTeamForm from "./CreateTeamForm";
import CreateSeasonForm from "./CreateSeasonForm";
import Api from "./Api";
import Draft from "../draft/Draft";

const availablePlayers = {
    1:{
      id:1,
      name:"Player One",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    2:{
      id:2,
      name:"Player Two",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    3:{
      id:3,
      name:"Player Three",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    4:{
      id:4,
      name:"Player Four",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    5:{
      id:5,
      name:"Player Five",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    6:{
      id:6,
      name:"Player Six",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    7:{
      id:7,
      name:"Player Seven",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    8:{
      id:8,
      name:"Player Eight",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    9:{
      id:9,
      name:"Player Nine",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    10:{
      id:10,
      name:"Player Ten",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
  }

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
  



const Commssioner = () => {
  const [beginDraft, setBeginDraft] = useState(false);
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = (response) => {
    if(response.status == 200){
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };
  const beginDraftButtonHandler = () => {
    setBeginDraft(true)
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
