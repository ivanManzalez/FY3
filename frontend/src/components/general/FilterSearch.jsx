import React, {useState, useEffect} from "react";

const FilterSearch = ({initialItems, handleSelection}) => {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const filterSearch = () => {
    if (filter.trim() === '') {
      // If the filter is empty, return an empty array to show no results.
      return [];
    }

    return (
      // Modify this logic based on your object structure.
      // This example assumes 'name' is the field to filter on.
      initialItems.filter((item) => {
        const itemString = Object.values(item)
        .map((value) => (value || '').toString().toLowerCase())
        .join(' ');
      return itemString.includes(filter.toLowerCase());
    }))};

  useEffect(() => {
    const filtered = filterSearch();
    setFilteredItems(filtered);
  }, [initialItems, filter]);

  const handleFilterSearch = (e) => {
    setFilter(e.target.value);
  };

  const handleItemSelection = (e) => {
    setFilter(' ')
    handleSelection()
  };

  return(
    <div>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={handleFilterSearch}
      />
      <ul>
        {filteredItems.length === 0 ? (
          <p>No results found.</p>
        ) : (
          filteredItems.map((item, index) => (
            <li onClick={handleItemSelection} key={index}>{item.first_name +" "+item.last_name }</li>
          ))
        )}
      </ul>
    </div>
  )
};

export default FilterSearch;