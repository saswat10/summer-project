import { spawnSync, execSync } from "child_process";

const getAnswerResult = (questions, singleStudentAnswers) => {
  //comparing a single answer

  let answerResults = [];
  for (const question of questions) {
    const singleStudentAnswer = singleStudentAnswers.find(
      (answer) => answer._id === question._id.toString()
    );
    let results;
    try {
      const { stdout } = spawnSync("python", [
        "script.py",
        question.answer,
        singleStudentAnswer.answer,
      ]);
      console.log(stdout.toString());
      const jsonresults = stdout.toString();
      /*  console.log(JSON.parse(stdout.toString())); */
      results =jsonresults;
      console.log(results);
    } catch (error) {
      console.log(error);
    }
    console.log("haha");

    console.log(results);
    const answerResult = {
      questionId: question._id.toString(),
      answer: singleStudentAnswer.answer,
      ...results,
    };
    console.log(answerResult);
    answerResults = [...answerResults, answerResult];
    console.log(answerResults);
  }
  return answerResults;
};

export default getAnswerResult;
