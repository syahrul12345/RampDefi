import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import Web3 from "web3";

const Survey = (props) => {
  const { survey, id, surveyContract, ethereum, web3 } = props;
  let name = survey[0];
  let choices = survey[1];
  let results = survey[2];
  const [datums, setDatums] = React.useState([]);
  React.useEffect(() => {
    choices.forEach((choice, index) => {
      datums.push({
        x: web3.utils.toUtf8(choice),
        y: results[index],
      });
    });
    setDatums(datums);
  }, [datums]);

  const vote = async (optionID) => {
    const encodedABI = await surveyContract.methods
      .answerSurvey(id + 1, optionID)
      .encodeABI();
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const params = [
      {
        from: accounts[0],
        to: surveyContract["_address"],
        data: encodedABI,
      },
    ];
    ethereum
      .request({
        method: "eth_sendTransaction",
        params,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        {/* Populate the chocies here */}
        <Grid container>
          {datums.map((datum, index) => {
            return (
              <Grid item xs={12}>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography>
                      {datum.x} : {datum.y}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => vote(index)}>Vote</Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Survey;
