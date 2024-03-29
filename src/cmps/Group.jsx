// Lib //
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// Store
import { updateBoard } from '../store/board.action.js';
import { openModal } from '../store/board.action';

// Cmp //
import Task from './Task.jsx';

// SVG //
import dotdotdot from '../assets/imgs/dotdotdot.svg';
import plus from '../assets/imgs/plus.svg';
import { socketService } from '../services/socket.service.js';

const Group = ({
  index,
  group,
  tasks,
  openListModal,
  selectedList,
  copyList,
  deleteList,
  editNewCard,
  closeAddNewCard,
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
  board,
}) => {
  const { boardId } = useParams();
  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));
  const dispatch = useDispatch();

  const [titleEdit, setTitleEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(group?.title);
  const toggleBoardModal = (modalType, group) => {
    openListModal(group);
    dispatch(openModal(modalType));
  };

  const changeGroupTitle = (group) => {
    if (board) {
      const newBoard = { ...board };
      let groupIdx = newBoard.groups.findIndex(
        (groupF) => group.id === groupF.id
      );
      newBoard.groups[groupIdx].title = newTitle;
      dispatch(updateBoard(newBoard));
      socketService.emit('updateBoard', newBoard);

      setTitleEdit(false);
    }
  };

  const handleGroupTitleChange = ({ target }) => {
    const value = target.value;
    setNewTitle(value);
  };

  return (
    <Draggable draggableId={group.id} index={index}>
      {(provided) => (
        <>
          <div
            className={'board-list flex-column'}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className='list-options' {...provided.dragHandleProps}>
              {titleEdit ? (
                <input
                  className='group-title-edit'
                  type='text'
                  defaultValue={group.title}
                  onChange={handleGroupTitleChange}
                  onBlur={() => changeGroupTitle(group)}
                />
              ) : (
                <span onClick={() => setTitleEdit(true)}>{group.title}</span>
              )}
              <img
                src={dotdotdot}
                className='list-menu pointer'
                alt='list menu'
                onClick={(ev) => {
                  ev.stopPropagation();
                  toggleBoardModal('groupModal', group);
                }}
              />
            </div>

            <Droppable droppableId={group.id} type='task'>
              {(provided) => (
                <>
                  <ul
                    ref={provided.innerRef}
                    className='flex-column list-ul'
                    {...provided.droppableProps}
                    style={
                      !selectedCard.id
                        ? { overflowY: 'auto' }
                        : { overflowX: 'visible', height: 'auto' }
                    }
                  >
                    {group?.tasks?.length > 0
                      ? group.tasksIds.map((taskId, index) => {
                          const taskObj = tasks.find(
                            (temp) => temp.id === taskId
                          );
                          return selectedCard?.id !== taskObj?.id ? (
                            <Task
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
                              style={{ height: '65px' }}
                            >
                              <textarea
                                type='text'
                                className='textarea-edit-card'
                                onChange={handleChange}
                                defaultValue={taskObj.title}
                              ></textarea>
                              <div
                                className='add-card pointer'
                                onClick={() => editCard(group, taskObj)}
                              >
                                Save
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
                                  <li
                                    onClick={() => deleteCard(group, taskObj)}
                                  >
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
                        placeholder='Add card title...'
                      ></textarea>
                      <div className='flex'>
                        <div
                          className='add-new-card-edit-btn pointer'
                          onClick={() => addNewCard(group)}
                        >
                          Add
                        </div>
                        <div
                          className='add-new-card-edit-btn pointer'
                          onClick={() => {
                            closeAddNewCard(group);
                          }}
                        >
                          X
                        </div>
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
            {selectedList.id === group.id && modal === 'groupModal' ? (
              <div className='board-list-modal seeOverlay'>
                <div className=' list-actions flex-center'>
                  <h3>List actions</h3>
                </div>
                <ul style={{ paddingLeft: '8px' }}>
                  <li onClick={() => copyList(group)}>Copy List</li>
                  <li onClick={() => editNewCard(group)}>Add Card</li>
                  <li onClick={() => deleteList(group)}>Delete List</li>
                </ul>
              </div>
            ) : null}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Group;
