import React, {useState} from "react";
import { getRecommendation } from "../serviceCall";
import { MOCK_RECOMMENDATION } from "../MOCK_RESPONSE";
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/material/LinearProgress';

const SearchBox = ({setResultList}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const handleButtonClick = () => {
    setIsLoading(true);
    getRecommendation(customerId).then(res => {
      if (res.status && res.status === 200) {
        setResultList(res.data.data);
      } else {
        setResultList(MOCK_RECOMMENDATION);
      }
    }).catch(e => {
      console.log(e);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleClearResult = () => {
    setResultList([]);
    setCustomerId("");
  };

  return (
    <div>
      <FormControl variant="standard">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Customer ID" variant="standard" value={customerId} onChange={(event) => setCustomerId(event.target.value)} />
          <Button disabled={isLoading} style={{marginLeft: "20px"}} variant="contained" onClick={handleButtonClick}>
            {isLoading?"Loading":"Recommend me"}
          </Button>
          <Button style={{marginLeft: "20px"}} variant="outlined" onClick={handleClearResult}>Clear</Button>
        </Box>
      </FormControl>
      <div style={{paddingBottom: 20, paddingTop: 20}}>{isLoading && <LinearProgress />}</div>
    </div>
  );
};

export default SearchBox;

