import React, {useContext, useState} from 'react';

const modalContext = React.createContext();
const setModalContext = React.createContext();

export function useModal() {
	return useContext(modalContext);
}

export function useModalUpdate() {
	return useContext(setModalContext);
}

export function ModalContextProvider({children}) {
	const [modal, setModal] = useState();

	const toggleModal = (type) => {
		console.log(modal);
		console.log(type);
		if (type === modal) setModal('');
		else {
			setModal(type);
		}
	};

	return (
		<modalContext.Provider value={modal}>
			<setModalContext.Provider value={toggleModal}>{children}</setModalContext.Provider>
		</modalContext.Provider>
	);
}
