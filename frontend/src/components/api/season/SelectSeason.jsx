import React, {useState, useEffect, forwardRef} from "react";
import {retrieveAllSeasons} from './season';
import SeasonDropdown from './SeasonDropdown'

const SelectSeason = forwardRef(({getSeason},ref) => {

  const [seasonsList, setSeasonsList] = React.useState([]);
  const [season, setSeason] = React.useState("");

  // Populate seasons on initial render
  useEffect(async () => {
    console.log("Retrieving all seasons...")
    const allSeasons = await retrieveAllSeasons();
    console.log("Setting seasons list...")
    setSeasonsList(allSeasons);
  }, []);

  const handleChange = async (data) => {
    setSeason(data);
    getSeason(data);
  };

  return (
    <SeasonDropdown ref={ref} name="Season" options = {seasonsList.data} setState={handleChange} />
  );
});

export default SelectSeason;