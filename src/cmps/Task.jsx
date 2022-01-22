import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
const Task = ({ task, index }) => {
  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightskyblue' : 'lightsalmon',

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className='Container'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
