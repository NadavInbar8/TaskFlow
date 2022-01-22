import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task.jsx';

{
  /* <Group key={column.id} column={column} tasks={tasks} />; */
}
{
  /* <Droppable droppableId={list.id}></Droppable> */
}

const Group = ({ column, tasks, index }) => {
  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightgreen' : 'lightyellow',
    'min-height': '100px',

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
          <h3 className='Title' {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <Droppable droppableId={column.id} type='task'>
            {(provided, snapshot) => (
              <div
                className='TaskList'
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Group;
