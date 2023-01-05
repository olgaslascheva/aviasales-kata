import React from 'react';
import { connect } from 'react-redux';

import { filterAllToggle, filterToggle } from '../../redux/actions';

import classes from './filters.module.scss';

function Filters({ allCheckedFilter, filters, onFilterAllChange, onFilterChange }) {
  return (
    <div className={classes.filters}>
      <h3 className={classes['filters__title']}>Количество пересадок</h3>
      <ul className={classes['filters__list']}>
        <li key="all" className={classes['filters__item']}>
          <label className={classes['filters__label']}>
            <input
              onChange={onFilterAllChange}
              checked={allCheckedFilter}
              className={classes['filters__input']}
              type="checkbox"
            />
            <span className={classes['filters__box']}></span>
            Все
          </label>
        </li>
        {filters.map(({ id, label, isChecked }) => {
          return (
            <li key={id} className={classes['filters__item']}>
              <label className={classes['filters__label']}>
                <input
                  onChange={() => onFilterChange(id)}
                  checked={isChecked}
                  className={classes['filters__input']}
                  type="checkbox"
                />
                <span className={classes['filters__box']}></span>
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allCheckedFilter: state.filters.allCheckedFilter,
    filters: state.filters.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterAllChange: () => dispatch(filterAllToggle()),
    onFilterChange: (id) => dispatch(filterToggle(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
