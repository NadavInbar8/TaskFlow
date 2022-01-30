import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory, useParams, useRouteMatch} from 'react-router-dom';
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {io} from 'socket.io-client';

import {updateBoard, openModal} from '../store/board.action.js';
import {setUsers} from '../store/user.action.js';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
	Members,
	Labels,
	Checklist,
	Dates,
	Attachment,
	Cover,
	Move,
	EditAttachmentName,
} from '../cmps/detailsModals/Modals.jsx';
import {utilService} from '../services/util.service.js';
import {DetailscheckList} from '../cmps/detailsCmps/DetailsCmps.jsx';

import description from '../assets/imgs/description.svg';
import mapsvg from '../assets/imgs/map.svg';
import user from '../assets/imgs/usersvg.svg';
import label from '../assets/imgs/label.svg';
import checklist from '../assets/imgs/checklist.svg';
import date from '../assets/imgs/date.svg';
import attachment from '../assets/imgs/attachment.svg';
import cover from '../assets/imgs/cover.svg';
import coverwhite from '../assets/imgs/coverwhite.svg';
import move from '../assets/imgs/move.svg';
import copy from '../assets/imgs/copy.svg';
import trash from '../assets/imgs/trash.svg';
import activity from '../assets/imgs/activity.svg';
import title from '../assets/imgs/title.svg';
import plus from '../assets/imgs/plus.svg';
import xsvg from '../assets/imgs/x.svg';
import xsvgwhite from '../assets/imgs/xwhite.svg';
import arrowcross from '../assets/imgs/arrowcross.svg';
import {userService} from '../services/user.service.js';
import {socket} from '../RootCmp.jsx';

/* googlemap stuff */
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from 'use-places-autocomplete';
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from '@reach/combobox';
// import "@reach/combobox/styles.css"

export const CardDetails = () => {
	const history = useHistory();
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const {modal} = useSelector((state) => ({
		modal: state.boardModule.modal,
	}));
	const [loggedInUser, setLoggedInUser] = useState();
	const {users} = useSelector((state) => ({
		users: state.userModule.users,
	}));
	const {listId, cardId} = useParams();

	const dispatch = useDispatch();

	const [card, setCard] = useState({
		id: '',
		description: 'hi',
		comments: [],
		title: '',
		memebers: [],
		labels: [],
		date: '',
		attachedLinks: [],
		cover: '',
	});
	const [comment, setComment] = useState({by: 'guest', txt: ''});
	const [isMapShown, setIsMapShown] = useState(false);

	useEffect(() => {
		loadUsers();
		loadUser();

		// socket.on('setUpdatedBoard', (board) => {
		//   dispatch(updateBoard(board));
		// });
		socket.on('setUpdatedCard', (card) => {
			setCard(card);
			//   updateCard();
		});
	}, []);

	useEffect(async () => {
		setCard(getCard());
	}, []);
	useEffect(async () => {
		if (card.location) setIsMapShown(true);
	}, [card]);

	const loadUsers = async () => {
		const users = await userService.getUsers();
		dispatch(setUsers(users));
	};

	const loadUser = () => {
		let user = userService.getLoggedinUser();
		if (!user) user = userService.connectGuestUser();
		setLoggedInUser(user);
	};

	function getCard() {
		if (!board) return;
		let list = board.groups.find((group) => group.id === listId);
		let currCard = list.tasks.find((task) => task.id === cardId);
		return currCard;
	}

	function getNiceDate() {
		return `${new Date().toDateString()} ${new Date().getHours() + ':' + new Date().getMinutes()}`;
	}

	function handleChange({target}) {
		const field = target.name;
		const value = target.value;
		setCard({...card, [field]: value});
	}

	// Card crud//////////////////
	function deleteCard() {
		console.log(board);
		let listIdx = board.groups.findIndex((group) => group.id === listId);
		let currCardIdx = board.groups[listIdx].tasks.findIndex((task) => task.id === cardId);
		const updatedBoard = {...board};
		updatedBoard.groups[listIdx].tasks.length > 1
			? updatedBoard.groups[listIdx].tasks.splice(currCardIdx, 1)
			: updatedBoard.groups[listIdx].tasks.pop();
		updatedBoard.groups[listIdx].tasksIds.splice(currCardIdx, 1);
		// let activity = `${loggedInUser.fullName} deleted a card at board-${board.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Deleted a card at board: ${board.title}`,
			time: getNiceDate(),
		};
		updatedBoard.activities.unshift(activity);
		dispatch(updateBoard(updatedBoard));
		socket.emit('updateBoard', updatedBoard);
		history.push(`/board/${board._id}`);
	}

	function updateCard(activity) {
		let listIdx = board.groups.findIndex((group) => group.id === listId);
		let currCardIdx = board.groups[listIdx].tasks.findIndex((task) => task.id === cardId);
		const updatedBoard = {...board};
		updatedBoard.groups[listIdx].tasks[currCardIdx] = card;
		updatedBoard.activities.unshift(activity);
		dispatch(updateBoard(updatedBoard));
		socket.emit('updateBoard', updatedBoard);
	}

	// COMMENTS

	// creat comment
	function handleCommentChange({target}) {
		const field = target.name;
		const value = target.value;
		setComment({byMember: loggedInUser, txt: value});
	}

	//   add
	function addComment(ev) {
		ev.preventDefault();
		console.log(comment);
		console.log(new Date().toString());
		const newComment = {
			...comment,
			createdAt: Date.now(),
		};
		const currCard = card;
		currCard.comments ? currCard.comments.push(newComment) : (currCard.comments = [newComment]);
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} added a comment to card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Added a comment in card: ${card.title}`,
			time: getNiceDate(),
		};

		updateCard(activity);
		setComment({byMember: loggedInUser, txt: ''});
	}
	// remove
	function deleteComment(idx) {
		const currCard = card;
		currCard.comments.splice(idx, 1);
		setCard(currCard);
		socket.emit('updateCard', card);
		// console.log(currCard);
		// let activity = `${loggedInUser.fullName} deleted a comment at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Deleted a comment at card: ${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	// ADD DATE
	function addDate(date) {
		const months = [
			'Jan',
			'Feb',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		console.log(Date.now() - date.getTime());
		const isOverDue = date.getTime() - Date.now() > 0 ? false : true;
		const currCard = card;
		currCard.date = {
			date: months[date.getMonth()] + ' ' + date.getDate(),
			isComplete: false,
			overDue: isOverDue,
		};
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} added a date to card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Added a date to card: ${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	function toggleDateComplete() {
		console.log('changing');
		const currCard = card;
		currCard.date.isComplete = !currCard.date.isComplete;
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} marked ${card.title} date at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Marked ${card.title} date`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	// ADD LABEL
	function addLabel(label) {
		const currCard = card;
		currCard.labels ? currCard.labels.push(label) : (currCard.labels = [label]);
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} added a label at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: ` Added a label at card: ${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	function deleteLabel(idx) {
		const currCard = card;
		currCard.labels.splice(idx, 1);
		setCard(currCard);
		// let activity = `${loggedInUser.fullName} deleted a label at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Deleted a label at card: ${card.title}`,
			time: getNiceDate(),
		};
		console.log(currCard);
		updateCard(activity);
	}

	function updateLabelsList(newlabels) {
		const newBoard = board;
		newBoard.labelOptions = newlabels;
		// let activity = `${loggedInUser.fullName} updated the label list at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Updated the label list at card: ${card.title}`,
			time: getNiceDate(),
		};
		newBoard.activities.push(activity);
		dispatch(updateBoard(newBoard));
		socket.emit('updateBoard', newBoard);
	}

	// ADD CHECKLIST
	function addCheckList(checkList) {
		const currCard = card;
		currCard.checkLists?.length > 0 ? currCard.checkLists.push(checkList) : (currCard.checkLists = [checkList]);
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} added a checklist at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Added a checklist at card: ${card.title}`,
			time: getNiceDate(),
		};
		// console.log(currCard);
		updateCard(activity);
	}

	function saveItemToCheckList(str, idx) {
		const item = {txt: str, isDone: false};
		const currCard = card;
		currCard.checkLists[idx].items.push(item);
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} updated a checklist at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Updated a checklist at card: ${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	function updateCheckList(newCheckList, idx, itemIdx) {
		const currCard = card;
		currCard.checkLists[idx].items[itemIdx].isDone = !card.checkLists[idx].items[itemIdx].isDone;
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} updated a checklist at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Updated a checklist at card: ${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	function deleteItemFromCheckList(listIdx, itemIdx) {
		const currCard = card;
		currCard.checkLists[listIdx].items.splice(itemIdx, 1);
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} updated a checklist at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Updated a checklist at card: ${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	function deleteCheckList(checkListIdx) {
		const currCard = card;
		currCard.checkLists.splice(checkListIdx, 1);
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} deleted a checklist at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Deleted a checklist at card: ${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	// COVER
	function addCover(cover, type) {
		const currCard = card;
		currCard.cover = {cover, type};
		setCard(currCard);
		socket.emit('updateCard', card);
		// let activity = `${loggedInUser.fullName} added a cover at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Deleted a checklist at card: ${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	function deleteAttachment(idx) {
		console.log(idx);
		const currCard = card;
		if (currCard.attachments.length > 1) currCard.attachments.splice(1, idx);
		else currCard.attachments.pop();
		setCard(currCard);
		socket.emit('updateCard', card);

		let activity = {
			user: loggedInUser,
			msg: `Deleted a link at card-${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	function deleteCover() {
		const currCard = card;
		delete currCard.cover;
		setCard(currCard);
		updateCard();
	}

	// ATTACHMENTS;
	function attachLink(link) {
		console.log(link);
		const currCard = card;
		currCard.attachments ? currCard.attachments.push(link) : (currCard.attachments = [link]);
		console.log(currCard);
		setCard(currCard);
		socket.emit('updateCard', card);

		// let activity = `${loggedInUser.fullName} attached a link at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: `Attached a link at card-${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	function updateAttachmentName(name, idx) {
		toggleModal('editAttachment');
		const currCard = card;
		currCard.attachments[idx].name = name;
		setCard(currCard);
		socket.emit('updateCard', card);

		// let activity = `${loggedInUser.fullName} updated attachment name at card-${
		//   card.title
		// } at ${getNiceDate()}`;

		let activity = {
			user: loggedInUser,
			msg: `Updated attachment name at card-${card.title}`,
			time: getNiceDate(),
		};

		updateCard(activity);
	}

	function getStringTimeForImg(attachment) {
		let diff = Date.now() - attachment.createdAt;
		let str = '';
		if (diff < 1000 * 60) str = 'few seconds ago';
		else if (diff < 1000 * 60 * 60) str = 'few minutes ago';
		else if (diff < 1000 * 60 * 60 * 5) str = 'few hours ago';
		else if (diff < 1000 * 60 * 60 * 24) str = 'last day';
		else if (diff < 1000 * 60 * 60 * 24 * 4) str = 'few days ago';
		else if (diff < 1000 * 60 * 60 * 24 * 7) str = 'last week';
		else if (diff < 1000 * 60 * 60 * 24 * 7 * 3) str = 'last month';
		else if (diff < 1000 * 60 * 60 * 24 * 7 * 4 * 6) str = 'few months ago';
		else if (diff < 1000 * 60 * 60 * 24 * 7 * 4 * 12) str = 'last year';
		else if (diff < 1000 * 60 * 60 * 24 * 7 * 4 * 12 * 5) str = 'few years ago';
		else if (diff > 1000 * 60 * 60 * 24 * 7 * 4 * 12 * 5) str = 'more than five years ago ';

		return str;
	}

	// Move

	function moveCardToOtherList(chosenGroup, idx, type) {
		let currCard = {...card};
		let listIdx = board.groups.findIndex((group) => group.id === listId);
		let currCardIdx = board.groups[listIdx].tasks.findIndex((task) => task.id === cardId);

		let newBoard = {...board};
		const copiedCards = [...newBoard.groups[listIdx].tasks];
		console.log(copiedCards);

		if (type === 'move') {
			newBoard.groups[listIdx].tasks.splice(currCardIdx, 1);
			newBoard.groups[listIdx].tasksIds.splice(currCardIdx, 1);
		}

		// adding to list
		let chosenGroupIdx = newBoard.groups.findIndex((group) => group.id === chosenGroup.id);
		currCard.id = utilService.makeId();
		newBoard.groups[chosenGroupIdx].tasksIds.splice(idx, 0, currCard.id);

		newBoard.groups[chosenGroupIdx].tasks.splice(idx, 0, currCard);
		console.log(newBoard);

		// let activity = `${
		//   loggedInUser.fullName
		// } moved a card to another list at board-${board.title} at ${getNiceDate()}`;

		let activity = {
			user: loggedInUser,
			msg: ` Moved a card to another list at board-${board.title}`,
			time: getNiceDate(),
		};

		newBoard.activities.push(activity);

		dispatch(updateBoard(newBoard));
		socket.emit('updateBoard', newBoard);

		history.push(`/board/${board._id}`);
	}

	function addUserToCard(user) {
		const currCard = card;
		if (currCard.users) {
			const doesUserExist = currCard.users.some((currCardUser) => {
				return currCardUser._id === user._id;
			});
			if (doesUserExist) {
				const userIdx = currCard.users.findIndex((currCardUser) => {
					return currCardUser._id === user._id;
				});

				currCard.users.splice(userIdx, 1);
				setCard(currCard);
				socket.emit('updateCard', card);
				console.log(currCard);

				// let activity = `${loggedInUser.fullName} removed ${
				//   user.fullName
				// } from a card at card-${card.title} at ${getNiceDate()}`;

				let activity = {
					user: loggedInUser,
					msg: ` Removed ${user.fullName} from a card at card-${card.title}`,
					time: getNiceDate(),
				};

				updateCard(activity);
			} else {
				console.log(doesUserExist);
				currCard.users ? currCard.users.push(user) : (currCard.users = [user]);
				setCard(currCard);
				socket.emit('updateCard', card);
				console.log(currCard);

				// let activity = `${loggedInUser.fullName} added ${
				//   user.fullname
				// } to a card at card-${card.title} at ${getNiceDate()}`;

				let activity = {
					user: loggedInUser,
					msg: `Added ${user.fullName} to a card at card-${card.title}`,
					time: getNiceDate(),
				};

				updateCard(activity);
			}
		} else {
			currCard.users = [user];
			setCard(currCard);
			socket.emit('updateCard', card);
			console.log(currCard);
			// let activity = `${loggedInUser.fullName} added ${ user.fullname} to a card at card-${card.title} at ${getNiceDate()}`;
			let activity = {
				user: loggedInUser,
				msg: `Added ${user.fullName} to a card at card-${card.title}`,
				time: getNiceDate(),
			};

			updateCard(activity);
		}
	}

	// TOGLLING ALL MODALS
	function toggleModal(type) {
		dispatch(openModal(type));
	}

	const containerStyle = {
		width: '490px',
		height: '200px',
	};

	const center = {
		lat: 32.109333,
		lng: 34.855499,
	};

	const {isLoaded} = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyCyEVnrvvJpRys_Tzl0T2eg79GxEVj0JlQ',
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	function addMarker(lat, lng) {
		const currCard = card;
		currCard.location = {lat, lng};
		setCard(currCard);
		// let activity = `${loggedInUser.fullName} added location to a card at card-${card.title} at ${getNiceDate()}`;
		let activity = {
			user: loggedInUser,
			msg: ` Added location to a card at card-${card.title}`,
			time: getNiceDate(),
		};
		updateCard(activity);
	}

	return (
		<div>
			{board ? (
				<div
					className='go-back-container'
					onClick={() => {
						// toggleModal('');
						history.push(`/board/${board._id}`);
					}}>
					<section
						onClick={(ev) => {
							toggleModal('');
							ev.stopPropagation();
						}}
						className='card-details'>
						{card.cover && (
							<div className='cover-container'>
								{card.cover.type === 'color' && (
									<section className={card.cover.cover + '-cover' + ' ' + 'card-details-cover'}>
										<div className='exit-details'>
											<img
												onClick={() => {
													history.push(`/board/${board._id}`);
												}}
												src={xsvg}
												alt=''
											/>
										</div>
										<div className='edit-cover'>
											<img
												onClick={(ev) => {
													ev.stopPropagation();
													toggleModal('coverModal2');
												}}
												src={cover}
												alt=''
											/>
											<span>Cover</span>

											{modal === 'coverModal2' && <Cover addCover={addCover} toggleModal={toggleModal} />}
										</div>
									</section>
								)}
								{card.cover.type === 'img' && (
									<section className='card-details-cover cover-img'>
										<img className='cover-img-to-show' src={card.cover.cover} alt='' />
										<section className='cover-img-actions'>
											<div className='exit-details'>
												<img
													onClick={() => {
														history.push(`/board/${board._id}`);
													}}
													src={xsvgwhite}
													alt=''
												/>
											</div>
											<div className='edit-cover'>
												<img
													onClick={(ev) => {
														ev.stopPropagation();

														toggleModal('coverModal2');
													}}
													src={coverwhite}
													alt=''
												/>
												<span>Cover</span>

												{modal === 'coverModal2' && <Cover addCover={addCover} toggleModal={toggleModal} />}
											</div>
										</section>
									</section>
								)}
							</div>
						)}

						<div className='card-details-layout'>
							<div className='card-details-top'>
								<img className='details-larger-svg' src={title} />

								<div className='card-details-top-healine'>
									<input
										onBlur={() => {
											updateCard({
												user: loggedInUser,
												msg: 'changed headline',
												time: getNiceDate(),
											});
										}}
										onChange={handleChange}
										name='title'
										value={card.title}
										type='text-area'
									/>
								</div>

								{!card.cover && (
									<Link to={`/board/${board._id}`}>
										<img style={{height: '20px', width: '20px'}} src={xsvg} />
									</Link>
								)}
							</div>

							<div className='list-id-to-show'>
								In list:
								<span> </span>
								<span style={{textDecoration: 'underline'}}>{card.id}</span>{' '}
							</div>

							<div className='card-details-main'>
								<div className='edit-actions'>
									<section className='labels-date-section'>
										{card.users?.length > 0 && (
											<section className='users-section'>
												<h3>Members</h3>
												<section className='users-details-section'>
													{card.users.map((user, idx) => {
														const background = user._id === loggedInUser._id ? 'darkcyan' : 'red';
														return (
															<div className='user-profile-div'>
																{/* {console.log(loggedInUser)} */}
																{user?.imgUrl ? (
																	<div className='user-details'>
																		<div className='flex align-center'>
																			<img className='user-avatar-btn flex-center' src={user.imgUrl} alt='' />
																		</div>
																		{/* <span>{checkUserInBoard(user._id)}</span> */}
																	</div>
																) : (
																	<div className='user-details'>
																		<div className='flex align-center'>
																			<div className='user-avatar-btn flex-center'>{user.initials}</div>
																		</div>
																		{/* <span>{checkUserInBoard(loggedInUser._id)}</span> */}
																	</div>
																)}
															</div>
															// <div
															//   key={idx}
															//   style={{ backgroundColor: background }}
															//   className='user-details-preview'
															// >
															//   {user.initials}
															// </div>
														);
													})}

													<div
														onClick={(ev) => {
															ev.stopPropagation();
															toggleModal('memberModalLeft');
														}}
														className='user-profile-div user-details-preview add-user-button'>
														<img src={plus} alt='' />

														{modal === 'memberModalLeft' && (
															<Members
																board={board}
																members={board.members}
																addUserToCard={addUserToCard}
																loggedInUser={loggedInUser}
															/>
														)}
													</div>
												</section>
											</section>
										)}

										{card.labels?.length > 0 && (
											<div className='labels-details-section'>
												<h3>Labels</h3>
												<div className='labels-preview'>
													{card.labels.map((label, idx) => {
														return (
															<div
																onClick={() => {
																	deleteLabel(idx);
																}}
																key={idx}
																className={'card-details-labels-preview label-details-' + label.color}>
																<span className='label-text'>{label.name}</span>
															</div>
														);
													})}
													<div
														onClick={(ev) => {
															ev.stopPropagation();

															toggleModal('labelsModalLeft');
														}}
														className=' flex flex-center card-details-add-label'>
														<img src={plus} alt='' />
														{modal === 'labelsModalLeft' && (
															<Labels
																updateLabelsList={updateLabelsList}
																board={board}
																toggleModal={toggleModal}
																addLabel={addLabel}
															/>
														)}
													</div>
												</div>
											</div>
										)}

										<div className=' date-on-details'>
											{card.date && (
												<section className='date'>
													<h3>Due date</h3>
													<main>
														<input checked={card.date.isComplete} onChange={toggleDateComplete} type='checkbox' />
														{console.log(card.date.isComplete)}
														<span
															className='chosen-date'
															onClick={(ev) => {
																ev.stopPropagation();
																toggleModal('dateModalLeft');
															}}>
															{card.date.date}
														</span>
														&nbsp;
														{card.date.isComplete && <span className='completed'> completed!</span>}
														{card.date.overDue === true && !card.date.isComplete && (
															<span className='overdue-span'>overdue</span>
														)}
														{modal === 'dateModalLeft' && <Dates toggleModal={toggleModal} addDate={addDate} />}
													</main>
												</section>
											)}
										</div>
									</section>

									<div className='description'>
										<div className='description-title'>
											<img className='details-larger-svg' src={description} alt='' />
											<h3>Description:</h3>
										</div>
										<textarea
											className=''
											placeholder='Write your card description..'
											name='description'
											rows='10'
											value={card.description || ''}
											onChange={handleChange}
											onBlur={() =>
												updateCard({
													user: loggedInUser,
													msg: 'Changed description',
													time: getNiceDate(),
												})
											}
											type='text-box'
										/>
									</div>

									{card.attachments?.length > 0 && (
										<section className='card-details-attachments'>
											<div className='attachmets-title'>
												<img src={attachment} />
												<h3>Attachments:</h3>
											</div>
											{card.attachments.map((attachment, idx) => {
												return (
													<section key={idx} className='attachmets-links'>
														<div className='card-details-link'>
															<section className='img-container flex flex-center'>
																<img src={attachment.link} alt='img' />
															</section>
															<section className='link-description'>
																<span className='name-bold'>
																	{attachment.name}{' '}
																	<a href={attachment.link}>
																		<img src={arrowcross} alt='' />
																	</a>
																</span>
																<section className='link-actions'>
																	<span>
																		Added
																		{' ' + getStringTimeForImg(attachment) + ' '}-
																		<span
																			onClick={() => {
																				deleteAttachment(idx);
																			}}
																			className='edit-cover-span'
																			style={{textDecoration: 'underline'}}>
																			Delete
																		</span>
																		-
																		<span
																			className='edit-cover-span edit-name'
																			style={{textDecoration: 'underline'}}
																			onClick={(ev) => {
																				ev.stopPropagation();
																				toggleModal(`editAttachment${idx}`);
																			}}>
																			Edit
																			{modal === `editAttachment${idx}` && (
																				<EditAttachmentName
																					updateAttachmentName={updateAttachmentName}
																					toggleModal={toggleModal}
																					idx={idx}
																					attachment={attachment}
																				/>
																			)}
																		</span>{' '}
																	</span>
																</section>
																<span
																	className='cover-span'
																	onClick={() => {
																		addCover(attachment.link, 'img');
																	}}>
																	<img src={cover} alt='' /> <span>Make cover</span>
																</span>
															</section>
														</div>
													</section>
												);
											})}
										</section>
									)}

									<div className='check-lists-container'>
										{card.checkLists &&
											card.checkLists.map((checkList, idx) => {
												return (
													<DetailscheckList
														key={idx}
														idx={idx}
														card={card}
														checkList={checkList}
														saveItemToCheckList={saveItemToCheckList}
														updateCheckList={updateCheckList}
														deleteItemFromCheckList={deleteItemFromCheckList}
														deleteCheckList={deleteCheckList}
													/>
												);
											})}
									</div>
									{isMapShown && (
										<section className='location'>
											<div className='location-title'>
												<img className='large-svg-map' src={mapsvg} />
												<h3>location:</h3>
											</div>
											<section className='map'>
												{isLoaded && (
													<>
														{/* <Search /> */}
														<GoogleMap
															mapContainerStyle={containerStyle}
															center={center}
															zoom={8}
															// onLoad={onLoad}
															onUnmount={onUnmount}
															onClick={(ev) => {
																addMarker(ev.latLng.lat(), ev.latLng.lng());
															}}>
															<Marker position={card.location} />
														</GoogleMap>
													</>
												)}
											</section>
										</section>
									)}

									<div className='activity'>
										<img className='details-larger-svg' src={activity} />
										<h3>Activity</h3>
									</div>
									<form className=' add-comment-form' onSubmit={addComment} action=''>
										{!loggedInUser?.imgUrl && <div className='user-logo'>{loggedInUser?.initials}</div>}
										{loggedInUser?.imgUrl && (
											<div className='user-logo'>
												<img src={loggedInUser?.imgUrl} alt='' />
											</div>
										)}

										{/* {loggedInUser.imgUrl && (
                      <div className='user-logo'>
                        <img src={loggedInUser.imgUrl} />
                      </div>
                    )} */}
										<input
											value={comment.txt}
											name='comment'
											onChange={handleCommentChange}
											type='text'
											placeholder='Write comment...'
										/>
									</form>

									<div className='comments'>
										{card.comments && (
											<ul>
												{card.comments.map((comment, idx) => {
													return (
														<li className='comment' key={idx}>
															<section className='comment-user-content'>
																{console.log(comment)}

																{!loggedInUser?.imgUrl && <div className='user-logo'>{loggedInUser?.initials}</div>}
																{loggedInUser?.imgUrl && (
																	<div className='user-logo'>
																		<img src={loggedInUser?.imgUrl} alt='' />
																	</div>
																)}
															</section>

															<div className='comment-content'>
																<span className='comment-user-fullname'>
																	{comment.byMember.fullname} At-
																	<span>&nbsp;{getStringTimeForImg(comment)}</span>
																</span>
																<span className='comment-txt'>
																	<span>{comment.txt}</span>
																</span>
															</div>
														</li>
													);
												})}
											</ul>
										)}
									</div>
								</div>

								<div className='actions'>
									<section className='modals-container'>
										<ul className='actions-list'>
											{/* /////////////////////////////////////////////// */}
											<li className='title-li'>Add to Card</li>
											{/* ////////////////////////////////////////////////////////////////////// */}
											<li className='details-li'>
												<span
													className='li-span'
													onClick={(ev) => {
														ev.stopPropagation();
														toggleModal('memberModal');
													}}>
													<img className='details-svg' src={user} alt='' />
													Members
												</span>
												{modal === 'memberModal' && (
													<Members
														board={board}
														members={board.members}
														toggleModal={toggleModal}
														addUserToCard={addUserToCard}
														loggedInUser={loggedInUser}
													/>
												)}
											</li>
											{/* /////////////////////////////////////////////////////////////////// */}
											<li className='details-li'>
												<span
													className='li-span'
													onClick={(ev) => {
														ev.stopPropagation();
														toggleModal('labelsModal');
													}}>
													<img className='details-svg' src={label} alt='' />
													Labels
												</span>
												{modal === 'labelsModal' && (
													<Labels
														board={board}
														toggleModal={toggleModal}
														addLabel={addLabel}
														updateLabelsList={updateLabelsList}
													/>
												)}
											</li>
											{/* //////////////////////////////////////////////////////////////////// */}
											<li className='details-li'>
												<span
													className='li-span'
													onClick={(ev) => {
														ev.stopPropagation();
														toggleModal('checklistModal');
													}}>
													<img className='details-svg' src={checklist} alt='' />
													Checklist
												</span>
												{modal === 'checklistModal' && (
													<Checklist toggleModal={toggleModal} addCheckList={addCheckList} />
												)}
											</li>
											{/* ////////////////////////////////////////////////// */}
											<li className='details-li'>
												<span
													className='li-span'
													onClick={(ev) => {
														ev.stopPropagation();
														toggleModal('datesModal');
													}}>
													<img className='details-svg' src={date} alt='' />
													Dates
												</span>
												{modal === 'datesModal' && <Dates toggleModal={toggleModal} addDate={addDate} />}
											</li>
											{/* ///////////////////////////////////////////////////// */}
											<li className='details-li'>
												<span
													className='li-span'
													onClick={(ev) => {
														ev.stopPropagation();
														toggleModal('attachmentModal');
													}}>
													<img className='details-svg' src={attachment} alt='' />
													Attachment
												</span>
												{modal === 'attachmentModal' && (
													<Attachment toggleModal={toggleModal} attachLink={attachLink} />
												)}
											</li>
											{/* ////////////////////////////////////////////// */}
											<li className='details-li'>
												<span
													className='li-span'
													onClick={(ev) => {
														ev.stopPropagation();
														toggleModal('coverModal');
													}}>
													<img className='details-svg' src={cover} alt='' />
													Cover
												</span>
												{modal === 'coverModal' && <Cover addCover={addCover} toggleModal={toggleModal} />}
											</li>
											<li onClick={() => setIsMapShown(!isMapShown)} className='details-li'>
												<span className='li-span'>
													<img className='details-svg' src={mapsvg} alt='' />
													Location
												</span>
											</li>
											{/* /////////////////////////////////////////////// */}

											<li className='title-li'>Actions</li>
											<li className='details-li'>
												<span
													className='li-span'
													onClick={(ev) => {
														ev.stopPropagation();
														toggleModal('moveModal');
													}}>
													<img className='details-svg' src={move} alt='' />
													Move
												</span>
												{modal === 'moveModal' && (
													<Move
														type='move'
														board={board}
														moveCardToOtherList={moveCardToOtherList}
														toggleModal={toggleModal}
													/>
												)}
											</li>

											<li className='details-li'>
												<span
													className='li-span'
													onClick={(ev) => {
														ev.stopPropagation();
														toggleModal('moveModalCopy');
													}}>
													<img className='details-svg' src={copy} alt='' />
													Copy
												</span>
												{modal === 'moveModalCopy' && (
													<Move
														type='copy'
														board={board}
														moveCardToOtherList={moveCardToOtherList}
														toggleModal={toggleModal}
													/>
												)}
											</li>
											<li className='details-li' onClick={deleteCard}>
												<img className='details-svg' src={trash} alt='' />
												Archive
											</li>
										</ul>
									</section>
								</div>
							</div>
						</div>
					</section>
				</div>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
};

// function Search() {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestion,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 32.109333, lng: () => 34.855499 },
//       radius: 20 * 1000,
//     },
//   });
//   return (
//     <Combobox
//       onSelect={(address) => {
//         console.log(address);
//       }}
//     >
//       <ComboboxInput
//         value={value}
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//         disabled={!ready}
//         placeholder='Enter an Address'
//       />
//     </Combobox>
//   );
// }

// function mapStateToProps({ boardModule }) {
//   return {
//     boards: boardModule.boards,
//   };
// }

// const mapDispatchToProps = {
//   // loadBoards,
//   updateBoard,
// };

// export const CardDetails = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_CardDetails);

// card = {
// 	id:'',
// 	title:'',
// 	memebers:[],
// 	label:[],
// 	date: '',
// 	attachedLinks: [{},{}],
// 	cover : ''
// }
