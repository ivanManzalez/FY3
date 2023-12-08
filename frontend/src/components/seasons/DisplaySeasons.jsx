import React, { useState, useRef } from "react";

const DisplaySeasons = ({seasons, handleSelection}) => {

  const handleSeasonSelection = (e, season) => {
    console.log(season)
    const selection = {
      ...season
    }
    handleSelection(e, selection)
  }


  return(
    <>
    <div className="gallery">
      {seasons && seasons.map((season) => {
        const { id: seasonId  } = season;
        
        return (
        <div onClick={(e) => handleSeasonSelection(e, season)} className={" clickable centre player_card "}  key={seasonId}>
          <img src="/static/images/fy3-logo.png" alt="fy3-logo">{season.season_name}</img>
        </div>
        )
      }
      )}
    </div>
    </>
  )
}

export default DisplaySeasons;