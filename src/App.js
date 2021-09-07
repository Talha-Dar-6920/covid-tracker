import classes from './App.module.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Button from './components/UI/Button';
import Card from './components/UI/Card';
import Table from './components/Display/Table';

function App() {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [failedToFetch, setFailedToFetch] = useState(false);
  const [country, setCountry] = useState('Global');
  const [countries, setCountries] = useState('Global');
  const [fetchedData, setFetchedData] = useState({});
  const selectCountryRef = useRef();

  const fetchData = async () => {
    const data = await fetch('https://api.covid19api.com/summary');
    if (!data.ok) {
      throw new Error('');
    }
    const parsedData = await data.json();
    setFailedToFetch(false);
    setIsDataFetched((prevState) => !prevState);
    return parsedData;
  };

  const extractData = useCallback((data) => {
    data
      .then((response) => {
        const finalData = response;
        setIsDataFetched(true);
        setFailedToFetch(false);
        for (const currentCuntry of finalData.Countries) {
          if (currentCuntry.Country === selectCountryRef.current.value) {
            setFetchedData(currentCuntry);
            return;
          }
        }
        setCountry('Global');
        setFetchedData(finalData.Global);
      })
      .catch(() => {
        setIsDataFetched(false);
        setFailedToFetch(true);
      });
  }, []);

  useEffect(() => {
    fetchData()
      .then((response) => {
        const countriesNames = response.Countries.map((element) => (
          <option
            value={element.Country}
            className={classes.country}
            key={element.ID}>
            {element.Country}
          </option>
        ));

        setCountries(countriesNames);
      })
      .catch(() => {
        setIsDataFetched(false);
        setFailedToFetch(true);
      });
  }, []);

  useEffect(() => {
    extractData(fetchData());
  }, [extractData]);

  const fetchDataHandler = () => {
    setIsDataFetched((prevState) => !prevState);
    extractData(fetchData());
  };

  const extractDate = fetchedData.Date
    ? fetchedData.Date.toString().slice(0, 10)
    : '';

  const jsxEvaluation =
    isDataFetched && !failedToFetch ? (
      <div className={classes.container}>
        <Card>
          <Table
            countryName={fetchedData.Country || country}
            date={extractDate}
            newConfirmed={fetchedData.NewConfirmed}
            newDeaths={fetchedData.NewDeaths}
            newRecovered={fetchedData.NewRecovered}
            totalConfirmed={fetchedData.TotalConfirmed}
            totalDeaths={fetchedData.TotalDeaths}
            totalRecovered={fetchedData.TotalRecovered}
          />
        </Card>
      </div>
    ) : failedToFetch && !isDataFetched ? (
      <h1 className={classes.heading__error}>Something Went Wrong...</h1>
    ) : (
      <h1 className={classes.heading__loading}>Fetching Data...</h1>
    );

  return (
    <React.Fragment>
      {jsxEvaluation}
      <div className={classes.actions}>
        <select
          name='countries'
          id='countries'
          className={classes.countries}
          ref={selectCountryRef}>
          <option value='Global' className={classes.country}>
            Global
          </option>
          {countries}
        </select>
        <Button onClick={fetchDataHandler}>Fetch Data</Button>
      </div>
    </React.Fragment>
  );
}

export default App;
