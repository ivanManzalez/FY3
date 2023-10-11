import React, {useState, useEffect, forwardRef} from "react";
import {retrieveAllSeasons} from './season';
import SeasonDropdown from './SeasonDropdown'

const SelectSeason = forwardRef(({getSeason},ref) => {

  const [seasonsList, setSeasonsList] = React.useState([]);
  const [season, setSeason] = React.useState("");

  // Populate seasons on initial render
  useEffect(async () => {
    const allSeasons = await retrieveAllSeasons();
    setSeasonsList(allSeasons);
  }, []);

  const handleChange = async (data) => {
    setSeason(data);
    getSeason(data);
  };

  return (
    <SeasonDropdown ref={ref} name="Season" options = {seasonsList} setState={handleChange} />
  );
});

export default SelectSeason;