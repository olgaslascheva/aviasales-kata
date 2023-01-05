const defaultFiltersState = {
  allCheckedFilter: false,
  filters: [
    { id: '0', label: 'Без пересадок', isChecked: true },
    { id: '1', label: '1 пересадка', isChecked: false },
    { id: '2', label: '2 пересадки', isChecked: false },
    { id: '3', label: '3 пересадки', isChecked: false },
  ],
};

const filtersReducer = (state = defaultFiltersState, action) => {
  let newFilters;
  switch (action.type) {
    case 'FILTER_ALL_TOGGLE':
      newFilters = state.filters.map((el) => {
        return { ...el, isChecked: !state.allCheckedFilter };
      });
      return { allCheckedFilter: !state.allCheckedFilter, filters: newFilters };

    case 'FILTER_TOGGLE':
      const idx = state.filters.findIndex((el) => el.id === action.id);
      const oldItem = state.filters[idx];
      const newItem = { ...oldItem, isChecked: !oldItem.isChecked };
      newFilters = [...state.filters.slice(0, idx), newItem, ...state.filters.slice(idx + 1)];
      const newAllCheckedFilter = newFilters.every((el) => el.isChecked);
      return { allCheckedFilter: newAllCheckedFilter, filters: newFilters };

    default:
      return state;
  }
};

export default filtersReducer;
