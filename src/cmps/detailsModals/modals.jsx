import React, { useEffect, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import paint from '../../assets/imgs/paint.svg';
import arrowleft from '../../assets/imgs/arrowleft.svg';
import xsvg from '../../assets/imgs/x.svg';
export function Members({ users, loggedInUser, addUserToCard, toggleModal }) {
  const [usersMinusLoggedInUser, setUsers] = useState();

  function setUsersMinusLoggedInUser() {
    console.log(loggedInUser._id);
    let newUsers = users.filter((user) => {
      return user._id !== loggedInUser._id;
    });
    console.log(newUsers);
    setUsers(newUsers);
  }

  useEffect(() => {
    setUsersMinusLoggedInUser();
  }, []);

  function addUser(user) {
    addUserToCard(user);
  }

  return (
    <div>
      {usersMinusLoggedInUser && (
        <div className='details-modal members'>
          <div className='members-modal-layout'>
            <section className='members-modal-top'>
              <span> &nbsp; &nbsp;</span>
              <h3>Members</h3>
              <img onClick={() => toggleModal('memberModal')} src={xsvg} />
            </section>
            <hr />
            <main>
              <input type='text' placeholder='Search..' />
              <h3>Board Members</h3>
              <ul>
                <li
                  onClick={() => {
                    addUser(loggedInUser);
                  }}
                >
                  <div
                    style={{ color: 'black', backgroundColor: 'darkcyan' }}
                    className='user-logo'
                  >
                    {loggedInUser.initials}
                  </div>
                  {loggedInUser.fullName}
                </li>

                {usersMinusLoggedInUser.map((user, idx) => {
                  return (
                    <li onClick={() => addUser(user)} key={idx}>
                      <div
                        style={{ backgroundColor: 'red' }}
                        className='user-logo'
                      >
                        {user.initials}
                      </div>
                      {user.fullName}
                    </li>
                  );
                })}
              </ul>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export function Checklist({ toggleModal, addCheckList }) {
  const [checkList, setCheckList] = useState({
    title: '',
    items: [],
  });

  function handleChange({ target }) {
    setCheckList({ ...checkList, title: target.value });
    // console.log(checkList);
  }
  function saveCheckList(ev) {
    ev.preventDefault();
    console.log(checkList);
    addCheckList(checkList);
    setCheckList({
      title: '',
      items: [],
    });
    toggleModal('checklist');
  }

  return (
    <div className='details-modal cheklist'>
      <section className='checklist-modal-layout'>
        <div className='checklist-top'>
          <span> &nbsp;</span>
          <h3>Checklist</h3>
          <img
            onClick={() => {
              toggleModal('checklist');
            }}
            src={xsvg}
            alt=''
          />
        </div>
        <hr />
        <div className='cheklist-content'>
          <h5>Title</h5>
          <form onSubmit={saveCheckList}>
            <input
              value={checkList.title}
              onChange={handleChange}
              type='text'
            />
            <button>Add</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export function Attachment({ attachLink, toggleModal }) {
  const [link, setLink] = useState('');
  const [nameInputShown, setNameInputShown] = useState(false);
  const [name, setName] = useState('');

  function handleChange({ target }) {
    setNameInputShown(true);
    setLink(target.value);
  }

  function handleNameChange({ target }) {
    setName(target.value);
  }

  function uploadImg(ev) {
    const CLOUD_NAME = 'odedcloud';
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', 'odedkovo7644');

    return fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        attachLink({
          link: res.url,
          name: res.original_filename,
          createdAt: Date.now(),
        });
        toggleModal('attachment');
      })
      .catch((err) => console.error(err));
  }

  function saveLink() {
    const attachment = { link, name, createdAt: Date.now() };
    console.log(attachment);
    attachLink(attachment);
    toggleModal('attachment');
  }

  // <label>
  //   Upload your image to cloudinary!
  //   <input onChange={(event) => uploadImg(event)} type='file' />
  // </label>;

  return (
    <div className='details-modal attachment'>
      <div className='attachment-layout'>
        <section className='attachment-top'>
          <span> &nbsp; </span>
          <h3>Attachment</h3>
          <span
            onClick={() => {
              toggleModal('attachment');
            }}
          >
            X
          </span>
        </section>
        <hr />

        <h3 className='add-img-from-computer'>
          Computer <input onChange={(event) => uploadImg(event)} type='file' />
        </h3>
        <hr />
        <section className='attachment-main'>
          <h3>Attach a link</h3>
          <input
            placeholder='Attach any link here...'
            onChange={handleChange}
            name='link'
            value={link}
            type='text'
          />
          {nameInputShown && (
            <>
              <h3>Link name (optional)</h3>
              <input
                onChange={handleNameChange}
                name='name'
                value={name}
                type='text'
              />
            </>
          )}
          <br />
          <button onClick={saveLink}>Attach</button>
        </section>
      </div>
    </div>
  );
}

export function EditAttachmentName({
  toggleModal,
  updateAttachmentName,
  idx,
  attachment,
}) {
  const [name, setName] = useState(attachment.name);

  function handleChange({ target }) {
    setName(target.value);
  }
  return (
    <section
      onClick={(ev) => {
        ev.stopPropagation();
      }}
      className='details-modal edit-attachment'
    >
      <div className='edit-layout'>
        <section className='edit-attachment-top'>
          <span>&nbsp;</span>
          <h3>Edit attachment</h3>
          <img
            onClick={() => {
              toggleModal('editAttachment');
            }}
            src={xsvg}
          />
        </section>
        <hr />
        <main>
          <h3>Change name:</h3>
          <input
            onChange={handleChange}
            name='name'
            value={name}
            onChang={handleChange}
            type='text'
          />
          <button onClick={() => updateAttachmentName(name, idx)}>
            Update
          </button>
        </main>
      </div>
    </section>
  );
}

export function Cover({ addCover, toggleModal }) {
  const covers = [
    'green',
    'yellow',
    'blue',
    'dark-blue',
    'purple',
    'pink',
    'orange',
    'red',
    'brown',
    'light-blue',
    'turkiz',
  ];
  function saveCover(cover) {
    addCover(cover, 'color');
    toggleModal('cover');
  }

  return (
    <div className='details-modal Cover'>
      <section className='cover-modal-layout'>
        <div className='cover-modal-top'>
          <span> &nbsp; </span>
          <h3>Cover</h3>
          <img
            onClick={() => {
              toggleModal('cover');
            }}
            src={xsvg}
          />
        </div>
        <hr />
        <h3>Colors</h3>
        <section className='cover-modal-colors'>
          {covers.map((cover, idx) => {
            return (
              <div
                onClick={() => saveCover(cover)}
                key={idx}
                className={cover + '-cover' + ' ' + 'cover-to-show'}
              ></div>
            );
          })}
        </section>
      </section>
    </div>
  );
}

export function Labels({ addLabel, toggleModal, board, updateLabelsList }) {
  const [editMode, setEditMode] = useState(false);
  let labelsforState;
  // console.log(board);
  if (board.labelOptions) labelsforState = board.labelOptions;
  else
    labelsforState = [
      { id: 1, color: 'green', name: 'easy' },
      { id: 2, color: 'yellow', name: 'medium' },
      { id: 3, color: 'orange', name: 'hard' },
      { id: 4, color: 'red', name: 'very hard' },
      { id: 5, color: 'purple', name: 'company fun ' },
      { id: 6, color: 'blue', name: 'night activity' },
      { id: 7, color: 'dark-blue', name: 'urgent' },
    ];

  // console.log('labelsOptions', labelsforState);
  const [labels, setLabels] = useState(labelsforState);
  const [editLabel, setEditLabel] = useState({
    id: 1234,
    color: 'red',
    name: 'choose',
  });

  const [searchedLabel, setsearchedLabel] = useState('');

  function markChosen(label) {
    console.log(label);
    setEditLabel(label);
  }
  function handleEditLabelChange({ target }) {
    console.log(target.value);
    setEditLabel({ ...editLabel, name: target.value });
  }

  function saveLabel() {
    console.log('you are in labels list');
    console.log(labels);
    let newLabels = labels;
    let newLabel = editLabel;
    console.log(editLabel);

    newLabels.map((label) => {
      console.log(label.id, editLabel.id);
      if (label.id === editLabel.id) {
        console.log('same id');
        console.log(editLabel);
        label.name = editLabel.name;
        return label;
      } else return label;
    });
    console.log(newLabels);
    setLabels(newLabels);
    addLabel(editLabel);
    updateLabelsList(newLabels);
    setEditLabel({
      id: 1234,
      color: 'red',
      name: 'choose',
    });
  }

  function handleFilter({ target }) {
    setsearchedLabel(target.value);
    console.log(target.value);

    let newlLabels = labelsforState.filter((label) => {
      // console.log(label);
      return label.name.includes(target.value);
    });
    console.log(newlLabels);
    setLabels(newlLabels);
  }

  return (
    <div className='details-modal labels-modal'>
      <section className='labels-modal-layout'>
        <section className='labels-modal-top'>
          <img onClick={() => setEditMode(!editMode)} src={arrowleft} />
          <h3> Labels</h3>
          <img onClick={() => toggleModal('labels')} src={xsvg} />
        </section>
        <hr />

        {!editMode && (
          <div className='labels-modal-main'>
            <div className='labels-input'>
              <input
                autoComplete='false'
                onChange={handleFilter}
                placeholder='Search labels...'
                name='name'
                value={searchedLabel}
                type='text'
              />
            </div>
            <div className='labels-modal'>
              {labels.map((label, idx) => {
                return (
                  <div key={idx} className='label-row'>
                    <div
                      onClick={() => addLabel(label)}
                      className={' label label-' + label.color}
                    >
                      {label.name}
                    </div>
                    <img onClick={() => setEditMode(!editMode)} src={paint} />
                    {/* <button onClick={() => setEditMode(!editMode)}>edit</button> */}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {editMode && (
          <div className='edit-labels-section'>
            <span>Name</span>
            <br />
            <input
              className='edit-label-input'
              onChange={handleEditLabelChange}
              value={editLabel.name}
              // onBlur={changeLabel}
              placeholder='Name'
              type='text'
            />

            <h4>Select a color</h4>
            <div className='edit-labels'>
              {labels.map((label, idx) => {
                return (
                  <div
                    onClick={() => markChosen(label)}
                    className={'edit-label label-' + label.color}
                    key={idx}
                  ></div>
                );
              })}
            </div>
            <button onClick={saveLabel}>Save</button>
            {/* <button onClick={() => setEditMode(!editMode)}>go back</button> */}
          </div>
        )}
      </section>
    </div>
  );
}

export function Move({ board, moveCardToOtherList, toggleModal, type }) {
  const [selectedGroup, setSelectedGroup] = useState(board.groups[0]);
  const [selectedPosition, setSelectedPosition] = useState(0);

  function handleListChange({ target }) {
    // console.log(target.value);
    let selectedGroup = board.groups.find((group) => group.id === target.value);
    // console.log(selectedGroup);
    setSelectedGroup(selectedGroup);
  }

  function handlePositionChange({ target }) {
    // console.log(target.value);
    setSelectedPosition(target.value);
  }

  function moveCard() {
    // console.log(selectedGroup);
    // console.log(selectedPosition);
    moveCardToOtherList(selectedGroup, selectedPosition, 'move');
    toggleModal('moveModal');
  }

  function copyCard() {
    moveCardToOtherList(selectedGroup, selectedPosition, 'copy');
    toggleModal('moveModalCopy');
  }

  return (
    <div className='details-modal move-modal'>
      <div className='move-modal-layout'>
        {type === 'move' && (
          <section className='move-modal-top'>
            <span> &nbsp;</span>
            <h3>Move</h3>
            <img src={xsvg} onClick={() => toggleModal('moveModal')} />
          </section>
        )}
        {type === 'copy' && (
          <section className='move-modal-top'>
            <span> </span>
            <h3>Copy</h3>
            <img src={xsvg} onClick={() => toggleModal('moveModalCopy')} />
          </section>
        )}
        <hr />

        <main>
          <h3> Select Destination</h3>
          <div className='board-name'>
            <h5>Board</h5>
            <span>{board.title}</span>
          </div>
          <section className='move-to'>
            <select
              onChange={handleListChange}
              className='move-to-list'
              name='list'
              id=''
            >
              {board.groups.map((group, idx) => {
                return (
                  <option key={idx} value={group.id}>
                    {group.title}
                  </option>
                );
              })}
            </select>

            <select
              onChange={handlePositionChange}
              className='move-to-position'
              name='position'
            >
              {selectedGroup.tasks.map((task, idx) => {
                return (
                  <option key={idx} value={idx}>
                    {idx + 1}
                  </option>
                );
              })}
              <option value={selectedGroup.tasks.length + 1}>
                {selectedGroup.tasks.length + 1}
              </option>
            </select>
          </section>
        </main>

        {type === 'move' && (
          <section className='move-button'>
            <button onClick={moveCard}>MOVE</button>
          </section>
        )}
        {type === 'copy' && (
          <section className='move-button'>
            <button onClick={copyCard}>Copy</button>
          </section>
        )}
      </div>
    </div>
  );
}

export class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
    };
  }

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  }

  saveDate = () => {
    console.log(this.state.selectedDay);
    this.props.addDate(this.state.selectedDay);
    console.log(this.state.selectedDay);
    this.props.toggleModal('dates');
  };

  render() {
    return (
      <div className='details-modal Dates'>
        <div className='date-modal-layout'>
          <section className='date-modal-top'>
            <span>&nbsp;</span>
            <h3>Date</h3>
            <img
              onCLick={() => this.props.toggleModal('dates')}
              src={xsvg}
              alt=''
            />
          </section>
          <hr />
          <DayPicker
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
          />
          <p>
            <button onClick={this.saveDate}>save</button>
          </p>
        </div>
      </div>
    );
  }
}
