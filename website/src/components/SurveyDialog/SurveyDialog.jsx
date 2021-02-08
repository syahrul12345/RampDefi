import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, IconButton, TextField, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function SurveyDialog(props) {
  const { web3, ethereum, surveyContract } = props;
  const [open, setOpen] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [error, setError] = React.useState("");
  const [ethMessage, setEthMessage] = React.useState("");
  const [survey, setSurvey] = React.useState({
    name: "",
    options: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCreating(false);
  };

  const newSurvey = (input) => (event) => {
    setSurvey({
      ...survey,
      [input]: event.target.value,
    });
  };

  const editSurveyOption = (index) => (event) => {
    survey.options[index] = event.target.value;
    setSurvey({
      ...survey,
    });
  };
  const addNewOptionRow = () => {
    if (survey.options.length === 10) {
      setError("Cannot have more than 10 options");
      return;
    }
    survey.options.push("");
    setSurvey({
      ...survey,
    });
  };

  const deleteSurvey = (index) => {
    survey.options.splice(index, 1);
    if (survey.options.length <= 10) {
      setError("");
    }
    setSurvey({
      ...survey,
    });
  };

  const createSurvey = async () => {
    //Prepare the payload
    const optionsPayload = new Array(survey.options.length);
    survey.options.forEach((opt, index) => {
      optionsPayload[index] = web3.utils.fromAscii(opt);
    });
    const encodedABI = surveyContract.methods
      .createSurvey(survey.name, optionsPayload)
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
      .then(surveyCreatedSucc)
      .catch(surveyCreatedFail);
  };

  const surveyCreatedSucc = (result) => {
    setIsCreating(true);
    setSurvey({
      name: "",
      options: [],
    });
  };

  const surveyCreatedFail = (error) => {
    setIsCreating(true);
    setEthMessage("User rejected transaction");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New Survey
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        align="center"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a new survey (max 10 options)"}
        </DialogTitle>
        {!isCreating ? (
          <>
            <DialogContent>
              <TextField
                fullWidth={true}
                id="filled-basic"
                label="Survey Name"
                variant="filled"
                value={survey.name}
                onChange={newSurvey("name")}
              />
              <Grid container>
                {survey.options.map((opt, index) => (
                  <Grid
                    container
                    alignContent="center"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={11} style={{ paddingTop: "10px" }}>
                      <TextField
                        fullWidth={true}
                        id={`survey-option-${index}`}
                        label={`Option ${index + 1}`}
                        variant="filled"
                        value={opt}
                        onChange={editSurveyOption(index)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={() => deleteSurvey(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} style={{ paddingTop: "10px" }}>
                  <Button onClick={addNewOptionRow}> Add new Option </Button>
                  <Typography variant="body1" style={{ color: "red" }}>
                    {" "}
                    {error}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={createSurvey}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
              <Button onClick={handleClose} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <Typography> {ethMessage} </Typography>
            </DialogContent>
            <Button onClick={handleClose} variant="contained" color="primary">
              OK
            </Button>
          </>
        )}
      </Dialog>
    </div>
  );
}
