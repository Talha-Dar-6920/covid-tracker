import React from 'react';
import classes from './Table.module.css';

const Table = (props) => {
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <th className={classes['heading__primary--main']} colSpan='2'>
            {props.countryName}
          </th>
        </tr>
        <tr>
          <th className={classes.heading__primary}> Date </th>
          <td> {props.date} </td>
        </tr>
        <tr>
          <th className={classes.heading__primary}> New Confirmed </th>
          <td> {props.newConfirmed} </td>
        </tr>
        <tr>
          <th className={classes.heading__primary}> New Death </th>
          <td> {props.newDeaths} </td>
        </tr>
        <tr>
          <th className={classes.heading__primary}> New Recovered </th>
          <td> {props.newRecovered} </td>
        </tr>
        <tr>
          <th className={classes.heading__primary}> Total Confirmed </th>
          <td> {props.totalConfirmed} </td>
        </tr>
        <tr>
          <th className={classes.heading__primary}> Total Death </th>
          <td> {props.totalDeaths} </td>
        </tr>
        <tr>
          <th
            className={`${classes.heading__primary} ${classes['last-child']}`}>
            Total Recovered
          </th>
          <td className={classes['last-child']}> {props.totalRecovered} </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
