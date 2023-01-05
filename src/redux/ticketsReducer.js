const defaultTicketsState = {
  showedTickets: 5,
  tickets: [],
  stop: false,
  error: false,
};

const ticketsReducer = (state = defaultTicketsState, action) => {
  switch (action.type) {
    case 'SET_TICKETS':
      return { ...state, tickets: action.tickets };
    case 'SHOW-MORE_CLICK':
      const newShowedTickets = state.showedTickets + 5;
      return { ...state, showedTickets: newShowedTickets };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_STOP':
      return { ...state, stop: action.payload };
    default:
      return state;
  }
};

export default ticketsReducer;
