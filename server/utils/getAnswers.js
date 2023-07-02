import { spawnSync } from "child_process";

 const getAnswerResult = (questions, singleStudentAnswers) => {
    //comparing a single answer
  
    let answerResults = [];
    for (const question of questions) {
      const singleStudentAnswer = singleStudentAnswers.find(
        (answer) => answer._id === question._id.toString()
      );
  
      const { stdout } = spawnSync("python", [
        "script.py",
        question.answer,
        singleStudentAnswer.answer,
      ]);
      console.log('haha')
      const results=stdout.toString();
      console.log(results)
      const answerResult = {
        questionId: question._id,
        answer: singleStudentAnswer.answer,
        ...results,
      };
      answerResults = [...answerResults, answerResult];
    }
    return answerResults;
  };

  export default getAnswerResult