const defaultTabsState = {
  tabs: [
    { id: 'cheap', label: 'Самый дешевый', isActive: true, style: { backgroundColor: '#2196F3', color: 'white' } },
    { id: 'fast', label: 'Самый быстрый', isActive: false, style: {} },
    { id: 'optimal', label: 'Оптимальный', isActive: false, style: {} },
  ],
};

const tabsReducer = (state = defaultTabsState, action) => {
  switch (action.type) {
    case 'TABS_TOGGLE':
      const newTabs = state.tabs.map((tab) => {
        return tab.id === action.id
          ? { ...tab, isActive: true, style: { backgroundColor: '#2196F3', color: 'white' } }
          : { ...tab, isActive: false, style: {} };
      });
      return { tabs: newTabs };
    default:
      return state;
  }
};

export default tabsReducer;
