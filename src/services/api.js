const baseURL = "https://dummyjson.com"

const fetchUsers = async () => {
	try {
		const response = await fetch(`${baseURL}/users`)
		if (!response.ok) {
			throw new Error('Ошибка при загрузке пользователей')
		}
		const data = await response.json()
		return data.users
	} catch (error) {
		throw new Error('Ошибка при загрузке')
	}
}
const filterUsers = async query => {
	try {
		const response = await fetch(
			`${baseURL}/users/filter?key=firstName&value=${query}`
		)
		if (!response.ok) {
			throw new Error('Пользователь не найден')
		}
		const data = await response.json()
		return data.users
	} catch (error) {
		throw new Error('Пользователь не найден')
	}
}

export { fetchUsers, filterUsers }