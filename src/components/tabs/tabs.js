import React from 'react';
import { connect } from 'react-redux';

import { tabsToggle } from '../../redux/actions';

import classes from './tabs.module.scss';

function Tabs({ tabs, onTabsToggle }) {
  return (
    <ul className={classes['tabs-list']}>
      {tabs.map(({ id, label, style }) => {
        return (
          <li key={id} onClick={() => onTabsToggle(id)} style={style} className={classes['tabs-list__item']}>
            {label}
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = (state) => {
  return {
    tabs: state.tabs.tabs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTabsToggle: (id) => dispatch(tabsToggle(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
