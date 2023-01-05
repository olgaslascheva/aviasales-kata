export const filterAllToggle = () => ({ type: 'FILTER_ALL_TOGGLE' });
export const filterToggle = (id) => ({ type: 'FILTER_TOGGLE', id });
export const tabsToggle = (id) => ({ type: 'TABS_TOGGLE', id });
export const showMoreClick = () => ({ type: 'SHOW-MORE_CLICK' });
const setTickets = (tickets) => ({ type: 'SET_TICKETS', tickets });
export const setError = (payload) => ({ type: 'SET_ERROR', payload });
export const setStop = (payload) => ({ type: 'SET_STOP', payload });

export const getData = () => (dispatch) => {
  const getTickets = async (id) => {
    await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
      .then((res) => {
        if (res.status === 500) getTickets(id);
        if (res.ok) return res.json();
      })
      .then((res) => {
        if (!res.stop) {
          dispatch(setTickets(res.tickets));
          getTickets(id);
        } else {
          dispatch(setStop(res.stop));
        }
      })
      .catch(() => {
        dispatch(setError(true));
      });
  };

  const getSearchId = async () => {
    await fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((res) => getTickets(res.searchId))
      .catch(() => {
        dispatch(setError(true));
      });
  };

  getSearchId();
};
