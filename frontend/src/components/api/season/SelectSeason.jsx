import * as React from 'react';
import {retrieveAllSeasons} from './season';
import SeasonDropdown from './SeasonDropdown'


const SelectSeason = ({getSeason}) => {
  const [seasonsList, setSeasonsList] = React.useState([]);
  const [season, setSeason] = React.useState("");

  // Populate seasons on initial render
  React.useEffect(async () => {
    const allSeasons = await retrieveAllSeasons();
    setSeasonsList(allSeasons);
  }, []);

  const handleChange = async (data) => {
    setSeason(data);
    getSeason(data);

  };
  return (
    <SeasonDropdown name="Season" options = {seasonsList} setState={handleChange} />
  );
};

export default SelectSeason;