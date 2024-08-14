const compareUsers = {
	name: (a, b) => {
		const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
		const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
		return nameA.localeCompare(nameB)
	},
	age: (a, b) => a.age - b.age,
	gender: (a, b) => a.gender.localeCompare(b.gender),
	address: (a, b) => {
		const addressA = `${a.address.city}, ${a.address.address}`.toLowerCase()
		const addressB = `${b.address.city}, ${b.address.address}`.toLowerCase()
		return addressA.localeCompare(addressB)
	},
}

export { compareUsers }