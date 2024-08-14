import { useState } from "react";

export const Table = ({
  users,
  setCurrentUser,
  setShowModal,
  onSort,
  sortConfig,
}) => {
  const showUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };
  const [columnWidths, setColumnWidths] = useState({
    name: 150,
    age: 100,
    gender: 100,
    address: 200,
  });
  const getSortIcon = (column) => {
    if (!sortConfig || sortConfig.key !== column) return null;
    return sortConfig.direction === "ascending" ? "⇑" : "⇓";
  };

  const handleSort = (column) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    } else if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === "descending"
    ) {
      direction = null;
    }
    onSort(column, direction);
  };

  const handleMouseDown = (e, column) => {
    const startX = e.clientX;
    const startWidth = columnWidths[column];

    const handleMouseMove = (e) => {
      const newWidth = Math.max(50, startWidth + e.clientX - startX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [column]: newWidth,
      }));
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <table width="100%">
      <thead>
        <tr>
          <th
            style={{ width: columnWidths.name }}
            onClick={() => handleSort("name")}
          >
            ФИО {getSortIcon("name")}
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "name")}
            />
          </th>
          <th
            style={{ width: columnWidths.age }}
            onClick={() => handleSort("age")}
          >
            Возраст {getSortIcon("age")}
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "age")}
            />
          </th>
          <th
            style={{ width: columnWidths.gender }}
            onClick={() => handleSort("gender")}
          >
            Пол {getSortIcon("gender")}
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "gender")}
            />
          </th>
          <th
            style={{ width: columnWidths.address }}
            onClick={() => handleSort("address")}
          >
            Адрес {getSortIcon("address")}
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "address")}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => showUser(user)}>
            <td>{`${user.firstName} ${user.lastName} ${user.maidenName}`}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{`${user.address.city}, ${user.address.address}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
