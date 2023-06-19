 const getAnswerResult = (questions, singleStudentAnswers) => {
    //comparing a single answer
  
    let answerResults = [];
    for (const question of questions) {
      const singleStudentAnswer = singleStudentAnswers.find(
        (answer) => answer._id === question._id.toString()
      );
  
      const { stdout } = spawnSync("python", [
        "script.py",
        singleStudentAnswer.answer,
        question.answer,
      ]);
      const answerResult = {
        questionId: question._id,
        answer: singleStudentAnswer.answer,
        ...JSON.parse(stdout.toString()),
      };
      answerResults = [...answerResults, answerResult];
    }
    return answerResults;
  };

  export default getAnswerResult