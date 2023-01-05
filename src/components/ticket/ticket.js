import React from 'react';
import { add, format } from 'date-fns';

import classes from './ticket.module.scss';

function Ticket({ ticketData }) {
  const flightTime = (time, duration) => {
    const departure = format(new Date(time), 'HH:mm');
    const arrival = format(add(new Date(time), { minutes: duration }), 'HH:mm');
    return `${departure} - ${arrival}`;
  };

  const flightDuration = (duration) => {
    const hours = Math.trunc(duration / 60);
    let minutes = duration - hours * 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}ч ${minutes}м`;
  };

  const stopsTitle = (num) => {
    return num === 1 ? ' пересадка' : ' пересадки';
  };

  const ticketSegments = ticketData.segments.map((s, index) => {
    return (
      <div key={index} className={classes['tickets-list-item__segment']}>
        <div className={classes['tickets-list-item__col']}>
          <div className={classes['tickets-list-item__title']}>
            {s.destination} - {s.origin}
          </div>
          <div className={classes['tickets-list-item__text']}>{flightTime(s.date, s.duration)}</div>
        </div>
        <div className={classes['tickets-list-item__col']}>
          <div className={classes['tickets-list-item__title']}>В пути</div>
          <div className={classes['tickets-list-item__text']}>{flightDuration(s.duration)}</div>
        </div>
        <div className={classes['tickets-list-item__col']}>
          <div className={classes['tickets-list-item__title']}>
            {s.stops.length ? s.stops.length + stopsTitle(s.stops.length) : 'без пересадок'}
          </div>
          <div className={classes['tickets-list-item__text']}>{s.stops.join(', ')}</div>
        </div>
      </div>
    );
  });

  const aviaLogo = `https://pics.avs.io/220/76/${ticketData.carrier}.png`;

  return (
    <div key={ticketData.id} className={classes['tickets-list-item']}>
      <div className={classes['tickets-list-item__header']}>
        <span className={classes['tickets-list-item__price']}>{ticketData.price} Р</span>
        <img src={aviaLogo} className={classes['tickets-list-item__avialogo']} alt="Лого авиакомпании" />
      </div>
      <div className={classes['tickets-list-item__description']}>{ticketSegments}</div>
    </div>
  );
}

export default Ticket;
