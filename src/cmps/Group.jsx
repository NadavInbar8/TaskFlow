import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import dotdotdot from '../assets/imgs/dotdotdot.svg';
import close from '../assets/imgs/close.svg';
import plus from '../assets/imgs/plus.svg';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import { openModal } from '../store/board.action';
import Task1 from './Task1.jsx';

const Group = ({
  index,
  group,
  tasks,
  openListModal,
  selectedList,
  closeListModal,
  copyList,
  deleteList,
  editNewCard,
  selectedCard,
  openLabels,
  setOpenLabels,
  openEditModal,
  cardEdit,
  handleChange,
  editCard,
  closeEditModal,
  copyCard,
  deleteCard,
  addNewCard,
}) => {
  const { boardId } = useParams();
  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));
  const dispatch = useDispatch();

  const toggleBoardModal = (modalType, group) => {
    openListModal(group);
    dispatch(openModal(modalType));
  };

  //style={{ zIndex: group.style.zIndex, backgroundColor: 'red' }}
  return (
    <Draggable draggableId={group.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={
            // group.style.zIndex === 'high'
            // ? 'board-list seeOverlay flex-column'
            'board-list flex-column'
          }
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className='list-options' {...provided.dragHandleProps}>
            <span>{group.title}</span>
            <img
              src={dotdotdot}
              className='list-menu'
              alt='list menu'
              onClick={() => {
                toggleBoardModal('groupModal', group);
              }}
            />
          </div>
          {selectedList.id === group.id && modal === 'groupModal' ? (
            <div className='board-list-modal'>
              <div className=' modal-top'>
                <h3>Group Modal</h3>
                <img
                  onClick={() => closeListModal(group)}
                  className='closeBtn'
                  src={close}
                  alt='close'
                />
              </div>
              <hr />
              <ul>
                <li onClick={() => copyList(group)}>Copy List</li>
                <li onClick={() => editNewCard(group)}>Add Card</li>
                <li onClick={() => deleteList(group)}>Delete List</li>
              </ul>
            </div>
          ) : null}
          <Droppable droppableId={group.id} type='task'>
            {(provided) => (
              <>
                <ul
                  ref={provided.innerRef}
                  className='flex-column flex-center'
                  {...provided.droppableProps}
                >
                  {group.tasks.length > 0
                    ? group.tasksIds.map((taskId, index) => {
                        const taskObj = tasks.find(
                          (temp) => temp.id === taskId
                        );
                        return selectedCard.id !== taskObj.id ? (
                          <Task1
                            key={taskId}
                            task={taskObj}
                            index={index}
                            openLabels={openLabels}
                            setOpenLabels={setOpenLabels}
                            openEditModal={openEditModal}
                            cardEdit={cardEdit}
                            groupId={group.id}
                          />
                        ) : (
                          <li
                            key={taskObj.id}
                            className='board-card overlaySee'
                          >
                            <input
                              type='text'
                              defaultValue={taskObj.title}
                              onChange={handleChange}
                            />
                            <div
                              className='add-card'
                              onClick={() => editCard(group, taskObj)}
                            >
                              save
                            </div>
                            <div className='edit-modal'>
                              <ul>
                                <li>
                                  <Link
                                    onClick={closeEditModal}
                                    to={`/board/${boardId}/${taskObj.id}/${group.id}`}
                                  >
                                    Open Card
                                  </Link>
                                </li>
                                <li>Edit Labels</li>
                                <li>Change Members</li>
                                <li>Change Cover</li>
                                <li onClick={() => copyCard(group, taskObj)}>
                                  Copy
                                </li>
                                <li>Edit Dates</li>
                                <li onClick={() => deleteCard(group, taskObj)}>
                                  Archive
                                </li>
                              </ul>
                            </div>
                          </li>
                        );
                      })
                    : null}
                  {provided.placeholder}
                </ul>

                {group.editMode ? (
                  <div className='add-new-card-edit'>
                    <textarea
                      type='text'
                      name='newCard'
                      onChange={handleChange}
                    ></textarea>
                    <div
                      className='add-new-card-edit-btn'
                      onClick={() => addNewCard(group)}
                    >
                      add
                    </div>
                  </div>
                ) : (
                  <div
                    className='add-new-card'
                    onClick={() => editNewCard(group)}
                  >
                    <img src={plus} alt='+' /> <span>Add new card</span>
                  </div>
                )}
              </>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Group;
