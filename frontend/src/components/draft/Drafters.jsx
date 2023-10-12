import React, {useState} from "react";

const Drafters = ({handler, pickNumber}) => {
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
  const teams = Object.values(teamsList);
  return(
    <div>
    <h4>Drafter</h4>
    <div className="drafters">
      <p key={teams[pickNumber].id} value={teams[pickNumber].id}>
        {teams[pickNumber].name}
      </p>
    </div>
    </div>
  )}
export default Drafters;