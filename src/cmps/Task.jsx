import React from 'react';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
const Task = ({ task, index, openEditModal, boardId, column }) => {
  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '12px',
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'whitesmoke' : 'whitesmoke',

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className='task-container flex'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Link to={`/board/${boardId}/${task.id}/${column.id}`}>
            {task.title}
          </Link>
          <div
            className='task-container-btn'
            onClick={() => openEditModal(task)}
          >
            edit
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
