import { FormRow } from "../../components"

const NewTest = () => {
  return (
    <section className="p-4">
      <h2 className='text-4xl font-semibold uppercase '>Create  New Test</h2>
			<hr className='my-2 border-[0.5px] border-gray-400' />

      <form className="bg-gray-400 rounded-md p-4 flex-col">
        <div className="py-1">
          <label htmlFor="testName" className="font-medium px-3">Test Name:</label>
          <input  required type="text" className="rounded-sm p-1 mx-2"/>
        </div>
        <div className="flex my-3">
          <label htmlFor="testName" className="font-medium px-3">Question 1:</label>
          <textarea type="text" className="rounded-sm p-2 mx-2 " rows='2' cols='80' placeholder="Write your question" />
        </div>
        <div className="flex my-2">
          <label htmlFor="testName" className="font-medium px-3">Answer 1:</label>
          <textarea type="text" className="rounded-sm p-2 mx-5 " rows='5' cols='80'  placeholder="Write your answer"/>
        </div>


        <div className="flex gap-2 mx-2 my-5">
          <button type="reset" className="bg-red-600 text-white p-2 rounded-md text-center">Reset</button>
          <button type="submit" className="bg-green-600 text-white p-2 rounded-md text-center">Submit</button>
          <button type="button" className="bg-yellow-600 text-white p-2 rounded-md text-center">Save As Draft</button>
          <button type='button' className="bg-sky-600 text-white p-2 rounded-md text-center">Add Next Question</button>
        </div>
      </form>
    </section>
  )
}
export default NewTest