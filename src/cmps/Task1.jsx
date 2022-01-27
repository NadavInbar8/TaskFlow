import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link, useParams, useLocation } from 'react-router-dom';

/////// SVGS ///////
import dueDate from '../assets/imgs/card-due.svg';
import attachment from '../assets/imgs/card-attach.svg';
import cardChecklist from '../assets/imgs/card-checklist.svg';
import description from '../assets/imgs/card-desc.svg';

const Task1 = ({
  task,
  index,
  openLabels,
  setOpenLabels,
  openEditModal,
  cardEdit,
  groupId,
}) => {
  const { boardId } = useParams();
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          className='board-card flex-column'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {console.log('task.cover', task.cover)}
          {task.cover ? (
            <div
              className='card-cover flex-center'
              style={
                task.cover.type == 'color'
                  ? { backgroundColor: task.cover.cover, height: '38px' }
                  : null
              }
            >
              {task.cover.type == 'img' ? (
                <img src={task.cover.cover} className='card-img-cover' />
              ) : null}
            </div>
          ) : null}
          <div className='board-card-details'>
            {task.labels ? (
              <div
                className={
                  openLabels ? 'card-labels-open flex' : 'card-labels flex'
                }
              >
                <ul>
                  {task.labels.map((label, idx) => {
                    return (
                      <li
                        key={idx}
                        className='label'
                        onClick={() => setOpenLabels(!openLabels)}
                        style={{
                          backgroundColor: label.color,
                        }}
                      >
                        {openLabels ? `${label.name}` : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
            <div className='card-title flex'>
              <Link to={`/board/${boardId}/${task.id}/${groupId}`}>
                {task.title}
              </Link>
              <div
                className='board-card-edit-btn '
                onClick={() => {
                  openEditModal(task);
                }}
              >
                <img src={cardEdit} alt='edit' />
              </div>
            </div>
            <div className='card-options flex'>
              {task.date ? (
                <div
                  className='card-date flex'
                  style={
                    !task.date.overDue
                      ? { backgroundColor: '#61BD4F' }
                      : { backgroundColor: '#EB5A46' }
                  }
                >
                  <img src={dueDate} />
                  {task.date.date}
                </div>
              ) : null}
              {task.description ? (
                <img
                  className='board-card-description'
                  src={description}
                  title='this card has description'
                />
              ) : null}
              {task.checkLists ? (
                <div className='board-card-checklist'>
                  {task.checkLists.map((checkList, idx) => {
                    let checkListCounter = 0;

                    checkList.items.forEach((checkListItem) => {
                      if (checkListItem.isDone) {
                        checkListCounter++;
                      }
                    });
                    return (
                      <span className=' flex-center' key={idx}>
                        {checkListCounter}/{checkList.items.length}
                        <img src={cardChecklist} />
                      </span>
                    );
                  })}
                </div>
              ) : null}
              {task.attachments
                ? task.attachments.map((attachmentX) => {
                    console.log('attachmentX', attachmentX);
                    return (
                      <div
                        key={attachmentX.link}
                        className='board-card-attachment flex-center'
                      >
                        {task.attachments.length}
                        <img src={attachment} />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task1;
