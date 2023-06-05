const FormRow = ({ name, type, value, handleChange, labelText }) => {
	return (
		<div className=''>
			<label htmlFor={name} className=''>
				{labelText || name}
			</label>
			<input
				type={type}
				value={value}
				onChange={handleChange}
				className='my-1 block min-w-full rounded border-[1px] border-gray-300 bg-slate-100 px-1'
				name={name}
			/>
		</div>
	)
}
export default FormRow
