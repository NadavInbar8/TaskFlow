import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {Link, useParams, useLocation} from 'react-router-dom';

/////// SVGS ///////
import dueDate from '../assets/imgs/card-due.svg';
import attachment from '../assets/imgs/card-attach.svg';
import cardChecklist from '../assets/imgs/card-checklist.svg';
import description from '../assets/imgs/card-desc.svg';
import dueDateGray from '../assets/imgs/card-due-gray.svg';
import {Checklist} from './detailsModals/Modals';

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
          {task.cover && task.cover.type == 'color' ? (
            <div
              className={`card-cover flex-center ${task.cover.cover}-cover`}
              // style={task.cover.type == 'color' ? { backgroundColor: task.cover.cover, height: '32px' }  : null }
            ></div>
          ) : task.cover && task.cover.type == 'img' ? (
            <div className='card-img-cover'>
              <img src={task.cover.cover} className='img-cover' />
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
                        className={`label label-${label.color}`}
                        onClick={() => setOpenLabels(!openLabels)}
                        // style={{
                        //   backgroundColor: label.color,
                        // }}
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
              <div className='card-icons flex'>
                {task.date ? (
                  <div
                    className='card-date flex'
                    style={
                      task.date.overDue
                        ? task.date.isComplete
                          ? { backgroundColor: '#61BD4F' }
                          : { backgroundColor: '#EB5A46' }
                        : task.date.isComplete
                        ? { backgroundColor: '#61BD4F' }
                        : { backgroundColor: '#ebecf0', color: 'gray' }
                    }
                  >
                    <img
                      src={
                        task.date.isComplete || task.date.overDue
                          ? dueDate
                          : dueDateGray
                      }
                    />
                    <span>{task.date.date}</span>
                  </div>
                ) : null}
                {task.description ? (
                  <img
                    className='board-card-description'
                    src={description}
                    title='this card has description'
                  />
                ) : null}
                {task.attachments ? (
                  <div className='board-card-attachment'>
                    <img src={attachment} />
                    {task.attachments.length}
                  </div>
                ) : null}
                {task.checkLists ? (
                  <div className='board-card-checklist'>
                    {console.log(task.checkLists)}
                    {task.checkLists.map((checkList, idx) => {
                      let checkListCounter = 0;

                      checkList.items.forEach((checkListItem) => {
                        if (checkListItem.isDone) {
                          checkListCounter++;
                        }
                      });
                      <div className=' flex-center' key={idx}>
                        <img src={cardChecklist} />
                        {checkListCounter}/{checkList.items.length}
                      </div>;
                    })}
                  </div>
                ) : null}
              </div>
              <div className='flex board-card-members'>
                {task.users &&
                  task.users.map((user) => {
                    return (
                      <div key={user._id} className='card-members flex'>
                        <img
                          src={user.imgUrl}
                          alt={user.initials}
                          title={user.fullname}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task1;
