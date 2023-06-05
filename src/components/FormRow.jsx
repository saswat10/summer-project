const FormRow = ({name, type, value, handleChange, labelText}) => {
  return (
    <div className=''>
			<label htmlFor={name} className=''>
				{labelText || name}
			</label>
			<input
				type={type}
				value={value}
				onChange={handleChange}
				className='block bg-slate-100 border-[1px] rounded border-gray-300 my-1 min-w-full'
				name={name}
			/>
		</div>
  )
}
export default FormRow