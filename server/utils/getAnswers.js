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
        "script3.py",
        question.answer[0],
        question.answer[1],
        question.answer[2],
        singleStudentAnswer.answer,
      ]);
      results =JSON.parse(stdout.toString());
    } catch (error) {
      console.log(error);
    }
    const answerResult = {
      questionId: question._id.toString(),
      answer: singleStudentAnswer.answer,
      ...results,
    };
    answerResults = [...answerResults, answerResult];
  }
  return answerResults;
};

export default getAnswerResult;
