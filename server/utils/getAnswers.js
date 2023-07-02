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
      console.log(stdout);
      const results=stdout.toString();
      console.log(results)
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

  export default getAnswerResult