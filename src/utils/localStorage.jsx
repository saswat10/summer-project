//add user to local storage
export const addUserToLocalStorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user))
}

//remove user to local storage
export const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user')
}

//get user to local storage
export const getUserFromLocalStorage = () => {
	const result = localStorage.getItem('user')
	const user = result ? JSON.parse(result) : null
	return user
}
