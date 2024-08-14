import { useState } from 'react'
export const Search = ({ onSearch, getUsers }) => {
	const [input, setInput] = useState('')

	const handleInputChange = e => {
		setInput(e.target.value)
	}

	const handleSearch = e => {
		e.preventDefault()
		let result = input.toLowerCase()
		result = result.charAt(0).toUpperCase() + result.slice(1)
		onSearch(result)
		setInput('')
	}

	return (
		<form onSubmit={handleSearch}>
			<input
				type='text'
				value={input}
				onChange={handleInputChange}
				placeholder='Введите имя пользователя...'
			/>
			<button type='submit'>Поиск</button>
			<button onClick={getUsers}>Сброс</button>
		</form>
	)
}