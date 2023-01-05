import React from 'react';
import { Progress } from 'antd';
import { connect } from 'react-redux';

import Filters from '../filters';
import Tabs from '../tabs';
import TicketsList from '../tickets-list';

import logo from './logo.svg';
import classes from './app.module.scss';

function App({ stop }) {
  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="Лого" />
      <main className={classes.main}>
        <Filters />
        <div className={classes.content}>
          <Tabs />
          {!stop ? <Progress percent={100} status="active" showInfo={false} strokeColor="#2196F3" /> : null}
          <TicketsList />
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stop: state.tickets.stop,
    tickets: state.tickets.tickets,
  };
};

export default connect(mapStateToProps)(App);
