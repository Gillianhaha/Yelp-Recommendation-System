import React, { useState } from "react";
import './App.css';
import SearchBox from "./components/SearchBox";
import DisplayResultTable from "./components/DisplayResultTable";
import DisplayResultMap from "./components/DisplayResultMap";
import {MOCK_RECOMMENDATION} from "./MOCK_RESPONSE";
import Grid from '@mui/material/Grid';


const App = () => {
  const [resultList, setResultList] = useState(MOCK_RECOMMENDATION);

  return (
    <div className="App" >
      <h2>Yelp Restaurant Recommendation</h2>
    <Grid container md={12}  justifyContent={"center"} direction={"column"}>
        <SearchBox setResultList={setResultList} />
        <Grid container spacing={2} flex={1}>
            <Grid item md={6}>
                <DisplayResultMap resultList={resultList} />
            </Grid>
            <Grid item md={6}>
                <DisplayResultTable resultList={resultList} />
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
