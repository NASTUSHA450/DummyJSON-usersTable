import { useState } from 'react'
export const Modal = ({ user, setShowModal, setCurrentUser  }) => {
    const closeModal = () => {
		setShowModal(false)
		setCurrentUser({})
	}
    return(
        <div className='modal-wrapper'>
            <div className='modal'>
                <h3>{`${user.firstName} ${user.lastName} ${user.maidenName}`}</h3>
                <ul>
                    <li><strong>Возраст</strong>{user.age} лет</li>
                    <li><strong>Адрес</strong>{`${user.address.city}, ${user.address.address}`}</li>
                    <li><strong>Рост</strong>{user.height} см.</li>
                    <li><strong>Вес</strong>{user.weight} кг.</li>
                    <li><strong>Номер телефона</strong>{user.phone}</li>
                    <li><strong>Email-адрес</strong>{user.email}</li>
                </ul>
                <button onClick={() => closeModal()}>Закрыть</button>
            </div>
        </div>
    )
}

// ФИО, возраст, адрес (город и название улицы), рост, вес, номер телефона и email-адрес.