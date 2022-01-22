import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task.jsx';

const Group = ({
  column,
  tasks,
  index,
  deleteList,
  editNewCard,
  addNewCard,
  handleChange,
  boardId,
  openEditModal,
  selectedCard,
  editCard,
  copyCard,
  closeEditModal,
  deleteCard,
}) => {
  const [edit, setEdit] = useState(false);
  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightgrey' : '#ebecf0',
    // minHeight: '100px',
    minWidth: '100px',
    Height: 'fit-content',

    padding: grid,
    width: 250,
  });
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className='Container'
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className='board-title flex'>
            <h3 className='Title' {...provided.dragHandleProps}>
              {column.title}
            </h3>
            <div className='board-title-btn' onClick={() => deleteList(column)}>
              delete
            </div>
          </div>
          <Droppable droppableId={column.id} type='task'>
            {(provided, snapshot) => (
              <div
                className='TaskList'
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {tasks.map((task, index) => {
                  return selectedCard.id !== task.id ? (
                    <>
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        openEditModal={openEditModal}
                        boardId={boardId}
                        column={column}
                      />
                    </>
                  ) : (
                    <div key={task.id} className='board-card overlaySee'>
                      <div className='board-card-options flex-column'>
                        <textarea
                          type='text'
                          defaultValue={task.title}
                          onChange={handleChange}
                        ></textarea>
                        <div
                          className='add-card'
                          onClick={() => editCard(column, task)}
                        >
                          Save
                        </div>
                      </div>
                      <div className='edit-modal'>
                        <ul>
                          <li>
                            <Link
                              onClick={closeEditModal}
                              to={`/board/${boardId}/${task.id}/${column.id}`}
                            >
                              Open Card
                            </Link>
                          </li>
                          <li>Edit Labels</li>
                          <li>Change Members</li>
                          <li>Change Cover</li>
                          <li onClick={() => copyCard(column, task)}>Copy</li>
                          <li>Edit Dates</li>
                          <li onClick={() => deleteCard(column, task)}>
                            Archive
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
                {provided.placeholder}
                {edit ? (
                  <div className='add-new-card-edit flex-column'>
                    <textarea
                      type='text'
                      name='newCard'
                      onChange={handleChange}
                      placeholder='Enter a title for this card...'
                      //   onBlur={updateCard}
                    ></textarea>
                    <div className='new-card-edit-options flex'>
                      <div
                        className='add-new-card-edit-btn'
                        onClick={() => {
                          addNewCard(column);
                          setEdit(false);
                        }}
                      >
                        Add
                      </div>
                      <div
                        className='add-new-card-edit-btn'
                        onClick={() => setEdit(false)}
                      >
                        X
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className='add-new-card'
                    onClick={() => {
                      editNewCard(column);
                      setEdit(true);
                    }}
                  >
                    + Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Group;
