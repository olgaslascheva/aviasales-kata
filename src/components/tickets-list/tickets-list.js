import React, { useEffect } from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';

import Ticket from '../ticket';
import { getData, showMoreClick } from '../../redux/actions';

import classes from './tickets-list.module.scss';

function TicketsList({ tickets, getData, tabs, filters, showedTickets, onShowMore }) {
  useEffect(() => {
    getData();
  }, []);

  const sortTickets = (array, tabId) => {
    switch (tabId) {
      case 'cheap':
        return array.sort((prevTicket, nextTicket) => prevTicket.price - nextTicket.price);
      case 'fast':
        return array.sort((prevTicket, nextTicket) => {
          const prevTicketTime = prevTicket.segments[0].duration + prevTicket.segments[1].duration;
          const nextTicketTime = nextTicket.segments[0].duration + nextTicket.segments[1].duration;
          return prevTicketTime - nextTicketTime;
        });
      default:
        return array;
    }
  };

  const filterTickets = (array, filterIds) => {
    let newArray = [];

    if (filterIds.includes('0')) {
      const filtered = array.filter((el) => {
        return el.segments[0].stops.length === 0 || el.segments[1].stops.length === 0;
      });
      newArray = [...newArray, ...filtered];
    } else if (filterIds.includes('1')) {
      const filtered = array.filter((el) => {
        return el.segments[0].stops.length === 1 || el.segments[1].stops.length === 1;
      });
      newArray = [...newArray, ...filtered];
    } else if (filterIds.includes('2')) {
      const filtered = array.filter((el) => {
        return el.segments[0].stops.length === 2 || el.segments[1].stops.length === 2;
      });
      newArray = [...newArray, ...filtered];
    } else if (filterIds.includes('3')) {
      const filtered = array.filter((el) => {
        return el.segments[0].stops.length === 3 || el.segments[1].stops.length === 3;
      });
      newArray = [...newArray, ...filtered];
    }

    return newArray;
  };

  const activeTabId = tabs.filter((el) => el.isActive)[0].id;

  const activeFilterId = filters.filters.filter((el) => el.isChecked).map((el) => el.id);
  const filteredTickets = filterTickets(sortTickets(tickets, activeTabId), activeFilterId);

  const itemsView = filteredTickets.length ? (
    filteredTickets.slice(0, showedTickets).map((ticket, index) => {
      return <Ticket key={index} ticketData={ticket} />;
    })
  ) : (
    <Alert message="Ошибка" description="Рейсов, подходящих под заданные фильтры, не найдено" type="warning" showIcon />
  );

  return (
    <div className={classes['tickets-list']}>
      {itemsView}
      <button onClick={onShowMore} className={classes['tickets-list__button']} type="button">
        Показать еще 5 билетов!
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.tickets,
    showedTickets: state.tickets.showedTickets,
    tabs: state.tabs.tabs,
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(getData()),
    onShowMore: () => dispatch(showMoreClick()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
