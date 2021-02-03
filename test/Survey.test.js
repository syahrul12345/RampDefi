const { expect } = require("chai");
const Web3 = require("web3");
const SurveyController = artifacts.require("SurveyController");

contract("SurveyController", async () => {
  beforeEach(async () => {
    this.SurveyController = await SurveyController.new();
    this.web3 = new Web3();
    this.surveyData = [
      {
        name: "Survey 1",
        choices: [
          this.web3.utils.fromAscii("Choice 1"),
          this.web3.utils.fromAscii("Choice 2"),
          this.web3.utils.fromAscii("Choice 3"),
        ],
      },
      {
        name: "Survey 2",
        choices: [
          this.web3.utils.fromAscii("Choice 4"),
          this.web3.utils.fromAscii("Choice 5"),
          this.web3.utils.fromAscii("Choice 6"),
        ],
      },
      {
        name: "Survey 3",
        choices: [
          this.web3.utils.fromAscii("Choice 7"),
          this.web3.utils.fromAscii("Choice 8"),
          this.web3.utils.fromAscii("Choice 9"),
        ],
      },
      {
        name: "Survey 4",
        choices: [
          this.web3.utils.fromAscii("Choice 10"),
          this.web3.utils.fromAscii("Choice 11"),
          this.web3.utils.fromAscii("Choice 12"),
        ],
      },
      {
        name: "Survey 5",
        choices: [
          this.web3.utils.fromAscii("Choice 13"),
          this.web3.utils.fromAscii("Choice 14"),
          this.web3.utils.fromAscii("Choice 15"),
        ],
      },
    ];
  });
  it("Should have zero surveys", async () => {
    const surveyCount = await this.SurveyController.surveyCount();
    const surveyCountReadable = this.web3.utils.fromWei(surveyCount, "ether");
    expect(surveyCountReadable).to.equal("0");
  });

  it("Should be able to create one survey and get survey returns the correct data", async () => {
    await this.SurveyController.createSurvey(
      this.surveyData[0].name,
      this.surveyData[0].choices
    );
    const surveyCount = await this.SurveyController.surveyCount();
    expect(surveyCount.toString()).to.equal("1");

    let res = await this.SurveyController.getSurvey(1);
    let name = res[0];
    expect(name).to.equal(this.surveyData[0].name);

    let choices = res[1];
    let results = res[2];
    choices.forEach((choice, index) => {
      expect(this.web3.utils.toUtf8(choice)).to.equal(
        this.web3.utils.toUtf8(this.surveyData[0].choices[index])
      );
      expect(results[index].toString()).to.equal("0");
    });

    //Answering the survey
    //Choose option 0 in survey 1 once
    await this.SurveyController.answerSurvey(1, 0);
    //Choose option 1 in survey 1 three times
    await this.SurveyController.answerSurvey(1, 1);
    await this.SurveyController.answerSurvey(1, 1);
    await this.SurveyController.answerSurvey(1, 1);

    //Choose option 2 in survey 1 two times
    await this.SurveyController.answerSurvey(1, 2);
    await this.SurveyController.answerSurvey(1, 2);

    res = await this.SurveyController.getSurvey(1);
    results = res[2];
    expect(results[0].toString()).to.equal("1");
    expect(results[1].toString()).to.equal("3");
    expect(results[2].toString()).to.equal("2");
  });
});
