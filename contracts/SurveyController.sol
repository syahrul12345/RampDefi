// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SurveyController is OwnableUpgradeable {
    struct Survey {
        string name;
        bytes32[] choices;
    }
    uint256 public surveyCount;
    mapping(uint256 => Survey) public surveyList;
    mapping(bytes32 => bytes32) public choiceNames;
    mapping(bytes32 => uint256) public choiceValues;
    mapping(bytes32 => bool) public choiceExists;

    function initialize() public {
        __Ownable_init();
        surveyCount = 0;
    }

    function createSurvey(string memory _name, bytes32[] memory _choices)
        public
    {
        require(_choices.length <= 10, "Can only have up to 10 choices");
        //Increment surveycount. This serves as the id.
        //First survey will have id of 1
        surveyCount++;
        Survey memory survey = Survey(_name, _choices);
        //Store in surveylist array
        surveyList[surveyCount] = survey;
        //This is done because we cannot have individual surveys to unique mappings for each choice
        //All surveys will store their choice data in a single shared global mapping
        //Use surveyCount + name + choice index to generate a choice identifier(choiceID). This should have no collisions
        //ChoiceID is used to keep track of individual values in a global mapping
        for (uint256 i = 0; i < _choices.length; i++) {
            bytes32 choiceIdentifier =
                keccak256(abi.encodePacked(surveyCount, _name, i));
            choiceNames[choiceIdentifier] = _choices[i];
            choiceExists[choiceIdentifier] = true;
            choiceValues[choiceIdentifier] = 0;
        }
    }

    function getSurvey(uint256 _id)
        public
        view
        returns (
            string memory,
            bytes32[] memory,
            uint256[10] memory
        )
    {
        require(
            _id >= 1 && _id <= surveyCount,
            "ID must be between one and survey count"
        );
        Survey memory survey = surveyList[_id];
        uint256[10] memory values;
        for (uint256 i = 0; i < survey.choices.length; i++) {
            bytes32 choiceIdentifier =
                keccak256(abi.encodePacked(_id, survey.name, i));
            require(choiceExists[choiceIdentifier], "Invalid choice!");
            require(
                choiceNames[choiceIdentifier] == survey.choices[i],
                "Choice name incorrect"
            );
            uint256 answer = choiceValues[choiceIdentifier];
            values[i] = answer;
        }
        return (survey.name, survey.choices, values);
    }

    function answerSurvey(uint256 _id, uint256 _choiceID)
        public
        returns (bool)
    {
        require(
            _id >= 1 && _id <= surveyCount,
            "ID must be between one and survey count"
        );

        Survey memory survey = surveyList[_id];
        require(
            _choiceID >= 0 && _choiceID < survey.choices.length,
            "_choiceID is invalid"
        );

        bytes32 choiceIdentifier =
            keccak256(abi.encodePacked(_id, survey.name, _choiceID));
        require(choiceExists[choiceIdentifier], "Invalid choice!");

        choiceValues[choiceIdentifier] = choiceValues[choiceIdentifier] + 1;
        return true;
    }
}
