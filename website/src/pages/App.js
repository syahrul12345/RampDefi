import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";

import Dialog from "../components/Dialog/Dialog";
import SurveyDialog from "../components/SurveyDialog/SurveyDialog";
import Web3 from "web3";
import SurveyController from "../contracts/SurveyController.json";

import "./App.css";

function App() {
  const web3 = new Web3();
  const [ethereum, setEthereum] = React.useState(undefined);
  const [surveyContract, setSurveyContract] = React.useState(undefined);
  const [accounts, setAccounts] = React.useState([]);

  React.useEffect(() => {
    if (ethereum) {
      ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        setAccounts(accounts);
      });
      const surveyControllerContract = new web3.eth.Contract(
        SurveyController.abi,
        SurveyController.proxyAddress
      );
      setSurveyContract(surveyControllerContract);
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
      {!ethereum ? (
        <Dialog setEthereum={setEthereum} />
      ) : (
        <Grid container alignItems="center" justify="space-between">
          <Typography variant="body1"> Account: {accounts[0]}</Typography>
          <SurveyDialog
            ethereum={ethereum}
            surveyContract={surveyContract}
            web3={web3}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default App;
