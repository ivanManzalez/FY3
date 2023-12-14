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

    return initialItems
      .filter((item) => {
        // const itemString = Object.values(item)
        // .map((value) => (value || '').toString().toLowerCase())
        // .join(' ');
        const itemString = (item.first_name + ' ' + item.last_name).toLowerCase();
        return itemString.includes(filter.toLowerCase());
      })
      .sort((a, b) => {
        // Calculate a relevance score for each item based on the filter value.
        const aScore = calculateRelevanceScore(a, filter);
        const bScore = calculateRelevanceScore(b, filter);

        // Sort in descending order based on the relevance score.
        return bScore - aScore;
      });
  };

  const calculateRelevanceScore = (item, filter) => {
    const itemString = Object.values(item)
      .map((value, index) => {
        if (index === 'first_name' || index === 'last_name') {
          // If the field is 'first_name' or 'last_name', give it more weight.
          return ((value || '') + ' ' + value).toString().toLowerCase();
        } else {
          return (value || '').toString().toLowerCase();
        }
      })
      .join(' ');

    // Count how many times the filter string appears in the item string.
    const filterCount = (itemString.match(new RegExp(filter, 'g')) || []).length;

    // You can adjust the scoring logic as needed.
    // Here, we'll return the filter count as the score.
    return filterCount;
  };


  useEffect(() => {
    const filtered = filterSearch();
    setFilteredItems(filtered);
  }, [initialItems, filter]);

  const handleFilterSearch = (e) => {
    setFilter(e.target.value);
  };

  const handleItemSelection = (e) => {
    const itemId = e.currentTarget.getAttribute('data-key');
    const selectedItem = initialItems.find((item) => item.id === parseInt(itemId));
    setFilter('')
    handleSelection(selectedItem)
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
          <p></p>
        ) : (
          filteredItems.map((item, index) => (
            <li onClick={handleItemSelection} data-key={item.id}> {item.first_name +" "+item.last_name } </li>
          ))
        )}
      </ul>
    </div>
  )
};

export default FilterSearch;


// 
  // const filterOptions = (options, filterCriteria) => {
  //   return options.filter((option) => {
  //     // Filter based on the criteria passed to the function
  //     return filterCriteria(option);
  //   });
  // };
  
  // const fullnameFilter = (option, filterValue) => {
  //   return (
  //     option.first_name.toLowerCase().includes(filterValue.first_name.toLowerCase()) ||
  //     option.last_name.toLowerCase().includes(filterValue.last_name.toLowerCase())
  //   );
  // };

  // const handleInputChange = (event, newInputValue) => {
  //   // Filter the options based on the new input value.
  //   const filtered = loadedOptions.filter(
  //     // Refactor?
  //     (option) =>
  //       option.first_name.toLowerCase().includes(newInputValue.first_name.toLowerCase()) ||
  //       option.last_name.toLowerCase().includes(newInputValue.last_name.toLowerCase())
  //     //
  //   );
  //   setFilteredOptions(filtered);
  //   handleSelection(event, newInputValue);
  // };

