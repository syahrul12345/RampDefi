import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";

import Dialog from "../components/Dialog/Dialog";
import "./App.css";

function App() {
  const [ethereum, setEthereum] = React.useState(undefined);
  const [accounts, setAccounts] = React.useState([]);
  React.useEffect(() => {
    if (ethereum) {
      ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        setAccounts(accounts);
      });
    }
  }, [ethereum]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="flex-start"
      style={{
        minHeight: "100vh",
        marginTop: "15vh",
        paddingLeft: "25vw",
        paddingRight: "25vw",
      }}
    >
      <Grid>
        <Typography component="div">
          <Box fontSize={30} fontWeight={500}>
            SurveyFI: Surveys on the blockchain
          </Box>
          <Box fontSize={24} fontWeight={400} style={{ marginBottom: "15px" }}>
            For RAMP DeFi
          </Box>
        </Typography>
      </Grid>
      {!ethereum ? <Dialog setEthereum={setEthereum} /> : <>{accounts[0]}</>}
    </Grid>
  );
}

export default App;
