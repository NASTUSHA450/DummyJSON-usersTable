import { useEffect, useState, useMemo } from "react";
import { fetchUsers, filterUsers } from "./services/api";
import { compareUsers } from "./features/sort";

import { Table } from "./components/table";
import { Search } from "./components/search";
import { Modal } from "./components/modal";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setShowModal] = useState(false);
  const [currentUserModal, setCurrentUser] = useState({});

  const [sortConfig, setSortConfig] = useState(null)
  const [checkUsers, setCheckUsers] = useState(false)

  const [loading, setLoading] = useState(true)

  const getUsers = () => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false)
			setCheckUsers(true)
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (search) {
      setLoading(true)
      filterUsers(search).then((filteredUsers) => {
        if (filteredUsers.length > 0) {
          setUsers(filteredUsers);
          setCheckUsers(true)
          setLoading(false)
        } else {
          setCheckUsers(false)
          setLoading(false)
        }
      });
    }
  }, [search]);

  const handleSearch = (input) => {
    setSearch(input);
  };

  const handleSort = (key, direction) => {
		setSortConfig({ key, direction })
		if (direction === null) {
			setSortConfig(null)
		}
	}

	const sortedUsers = useMemo(() => {
		if (!sortConfig) return users

		const sorted = [...users].sort((a, b) => {
			const compare = compareUsers[sortConfig.key](a, b)
			return sortConfig.direction === 'ascending' ? compare : -compare
		})

		return sorted
	}, [users, sortConfig])

  return (
    <>
      <div className="container">
        <Search getUsers={getUsers} onSearch={handleSearch} />
        {loading ? (
				<p>Загрузка...</p>
			) : checkUsers ? (
				<Table
					users={sortedUsers}
					onSort={handleSort}
					sortConfig={sortConfig}
					setCurrentUser={setCurrentUser}
					setShowModal={setShowModal}
				/>
			) : (
				<p>Пользователи не найдены</p>
			)}
        
        {openModal ? (
          <Modal
            user={currentUserModal}
            setShowModal={setShowModal}
            setCurrentUser={setCurrentUser}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
