import React, { useEffect, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import paint from '../../assets/imgs/paint.svg';
import arrowleft from '../../assets/imgs/arrowleft.svg';
import xsvg from '../../assets/imgs/x.svg';
import check from '../../assets/imgs/check.svg';
export function Members({
  board,
  members,
  loggedInUser,
  addUserToCard,
  toggleModal,
}) {
  const [membersMinusLoggedInUser, setMembers] = useState();

  function setMembersMinusLoggedInUser() {
    let newMembers = members.filter((member) => {
      return member._id !== loggedInUser._id;
    });
    setMembers(newMembers);
  }

  useEffect(() => {
    setMembersMinusLoggedInUser();
  }, []);

  function addMember(member) {
    addUserToCard(member);
  }
  const checkUserInBoard = (userId) => {
    const imgToRender = board.members.some((member) => member._id === userId);
    if (imgToRender) return <img src={check} alt='check' />;
    else return '';
  };

  return (
    <div>
      {membersMinusLoggedInUser && (
        <div
          className='details-modal members'
          onClick={(ev) => ev.stopPropagation()}
        >
          <section className='details-modal-top'>
            <span>Members</span>
            <img
              onClick={(ev) => {
                ev.stopPropagation();
                toggleModal('memberModal');
              }}
              src={xsvg}
            />
          </section>
          <main
            className='details-modal-content'
            onClick={(ev) => ev.stopPropagation()}
          >
            <input type='text' placeholder='Search..' />
            <h4>Board Members</h4>

            <ul>
              <li
                onClick={() => {
                  addMember(loggedInUser);
                }}
              >
                <div className='user-profile-div'>
                  {loggedInUser?.imgUrl ? (
                    <div className='user-details'>
                      <div className='flex align-center'>
                        <img
                          className='user-avatar-btn flex-center'
                          src={loggedInUser.imgUrl}
                          alt=''
                        />
                        <span>{loggedInUser.fullName}</span>
                      </div>
                      {/* <span>{checkUserInBoard(loggedInUser._id)}</span> */}
                    </div>
                  ) : (
                    <div className='user-details'>
                      <div className='flex align-center'>
                        <div className='user-avatar-btn flex-center'>
                          {loggedInUser.initials}
                        </div>
                        <span>{loggedInUser.fullName}</span>
                      </div>
                      {/* <span>{checkUserInBoard(loggedInUser._id)}</span> */}
                    </div>
                  )}
                </div>
                {/* <div
                  style={{ color: 'black', backgroundColor: 'darkcyan' }}
                  className='user-logo'
                >
                  {loggedInUser.initials}
                </div>



                {loggedInUser.fullName} */}
              </li>

              {membersMinusLoggedInUser.map((member, idx) => {
                return (
                  <li
                    key={member._id}
                    onClick={() => {
                      addMember(member);
                    }}
                  >
                    <div key={idx} className='user-profile-div'>
                      {member?.imgUrl ? (
                        <div className='user-details'>
                          <div className='flex align-center'>
                            <img
                              className='user-avatar-btn flex-center'
                              src={member.imgUrl}
                              alt=''
                            />
                            <span>{member.fullName}</span>
                          </div>
                          {/* <span>{checkUserInBoard(member._id)}</span> */}
                        </div>
                      ) : (
                        <div className='user-details'>
                          <div className='flex align-center'>
                            <div className='user-avatar-btn flex-center'>
                              {member.initials}
                            </div>
                            <span>{member.fullName}</span>
                          </div>
                          {/* <span>{checkUserInBoard(member._id)}</span> */}
                        </div>
                      )}
                    </div>
                  </li>
                  //   <li onClick={() => addMember(member)} key={idx}>
                  //     <div
                  //       style={{ backgroundColor: 'red' }}
                  //       className='user-logo'
                  //     >
                  //       {member.initials}
                  //     </div>

                  //     {member.fullName}
                  //   </li>
                );
              })}
            </ul>
          </main>
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
  }
  function saveCheckList(ev) {
    ev.preventDefault();
    addCheckList(checkList);
    setCheckList({
      title: '',
      items: [],
    });
    toggleModal('checklist');
  }

  return (
    <div
      className='details-modal cheklist'
      onClick={(ev) => ev.stopPropagation()}
    >
      <section className='details-modal-top'>
        <span> Add checklist</span>
        <img
          onClick={(ev) => {
            ev.stopPropagation();

            toggleModal('checklist');
          }}
          src={xsvg}
          alt=''
        />
      </section>
      <div
        className='details-modal-content'
        onClick={(ev) => ev.stopPropagation()}
      >
        <h4>Title</h4>
        <input value={checkList.title} onChange={handleChange} type='text' />
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            saveCheckList(ev);
          }}
          className='blue-btn-modal'
        >
          Add
        </button>
      </div>
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
    attachLink(attachment);
    toggleModal('attachment');
  }

  // <label>
  //   Upload your image to cloudinary!
  //   <input onChange={(event) => uploadImg(event)} type='file' />
  // </label>;

  return (
    <div
      className='details-modal attachment'
      onClick={(ev) => ev.stopPropagation()}
    >
      <section className='details-modal-top'>
        <span>Attachment</span>
        <img
          src={xsvg}
          onClick={(ev) => {
            ev.stopPropagation();
            toggleModal('attachment');
          }}
        ></img>
      </section>

      <section
        className='details-modal-content'
        onClick={(ev) => ev.stopPropagation()}
      >
        <h4 className='add-img-from-computer'>
          Computer <input onChange={(event) => uploadImg(event)} type='file' />
        </h4>
        <h4>Attach a link</h4>
        <input
          placeholder='Attach any link here...'
          onChange={handleChange}
          name='link'
          value={link}
          type='text'
        />
        {nameInputShown && (
          <>
            <h4>Link name (optional)</h4>
            <input
              onChange={handleNameChange}
              name='name'
              value={name}
              type='text'
            />
          </>
        )}
        <button
          className='grey-btn-modal'
          onClick={(ev) => {
            ev.stopPropagation();
            saveLink();
          }}
        >
          Attach
        </button>
      </section>
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
      <section className='details-modal-top'>
        <span>Edit attachment</span>
        <img
          onClick={(ev) => {
            ev.stopPropagation();
            toggleModal('editAttachment');
          }}
          src={xsvg}
        />
      </section>
      <main className='details-modal-content'>
        <h3>Change name:</h3>
        <input
          onChange={handleChange}
          name='name'
          value={name}
          onChang={handleChange}
          type='text'
        />
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            updateAttachmentName(name, idx);
          }}
        >
          Update
        </button>
      </main>
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
    'light-blue',
    'turkiz',
  ];
  function saveCover(cover) {
    addCover(cover, 'color');
    toggleModal('cover');
  }

  return (
    <div className='details-modal Cover' onClick={(ev) => ev.stopPropagation()}>
      <div className='details-modal-top'>
        <span>Cover</span>
        <img
          onClick={(ev) => {
            ev.stopPropagation();
            toggleModal('cover');
          }}
          src={xsvg}
        />
      </div>

      <section className='  details-modal-content'>
        <h4>Colors</h4>
        <section className='cover-modal-colors'>
          {covers.map((cover, idx) => {
            return (
              <div
                onClick={(ev) => {
                  ev.stopPropagation();
                  saveCover(cover);
                }}
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
  if (board.labelOptions) labelsforState = board.labelOptions;
  else
    labelsforState = [
      { id: 1, color: 'green', name: 'easy' },
      { id: 2, color: 'yellow', name: 'medium' },
      { id: 3, color: 'orange', name: 'hard' },
      { id: 4, color: 'red', name: 'very hard' },
      { id: 5, color: 'purple', name: 'company fun ' },
      { id: 6, color: 'blue', name: 'night activity' },

      // { id: 1, color: '#519839', name: 'easy' },
      // { id: 2, color: '#ff9f1a', name: 'medium' },
      // { id: 3, color: '#eb5a46', name: 'hard' },
      // { id: 4, color: '#c377e0', name: 'very hard' },
      // { id: 5, color: '#0079bf', name: 'company fun ' },
      // { id: 6, color: '#00c2e0', name: 'night activity' },
      // { id: 7, color: '#51e898', name: 'urgent' },
      // { id: 8, color: '#ff78cb', name: 'fun' },
      // { id: 9, color: '#344563', name: 'remember' },
      // { id: 10, color: '#f2d600', name: 'important' },
    ];

  const [labels, setLabels] = useState(labelsforState);
  const [editLabel, setEditLabel] = useState({
    id: 1234,
    color: 'red',
    name: 'choose',
  });

  const [searchedLabel, setsearchedLabel] = useState('');

  function markChosen(label) {
    setEditLabel(label);
  }
  function handleEditLabelChange({ target }) {
    setEditLabel({ ...editLabel, name: target.value });
  }

  function saveLabel() {
    let newLabels = labels;
    let newLabel = editLabel;

    newLabels.map((label) => {
      if (label.id === editLabel.id) {
        label.name = editLabel.name;
        return label;
      } else return label;
    });

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

    let newlLabels = labelsforState.filter((label) => {
      return label.name.includes(target.value);
    });
    setLabels(newlLabels);
  }

  return (
    <div
      className=' labels details-modal'
      onClick={(ev) => ev.stopPropagation()}
    >
      <section className='details-modal-top'>
        <img
          className='arrowleft'
          onClick={(ev) => {
            ev.stopPropagation();
            setEditMode(!editMode);
          }}
          src={arrowleft}
        />
        <span> Labels</span>
        <img
          onClick={(ev) => {
            ev.stopPropagation();
            toggleModal('labels');
          }}
          src={xsvg}
        />
      </section>

      {!editMode && (
        <div className='details-modal-content'>
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
          <div className='labels-modal-content'>
            <h4>Labels</h4>
            <ul className='labels-set'>
              {labels.map((label, idx) => {
                return (
                  <li key={idx} className='label-row'>
                    <div
                      onClick={(ev) => {
                        ev.stopPropagation();
                        addLabel(label);
                      }}
                      className={' label label-' + label.color}
                    >
                      {label.name}
                    </div>
                    <img
                      onClick={(ev) => {
                        ev.stopPropagation();
                        setEditMode(!editMode);
                      }}
                      src={paint}
                    />
                    {/* <button onClick={() => setEditMode(!editMode)}>edit</button> */}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {editMode && (
        <div className='details-modal-content'>
          <span>Name</span>

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
                  onClick={(ev) => {
                    ev.stopPropagation();
                    markChosen(label);
                  }}
                  className={'edit-label label-' + label.color}
                  key={idx}
                ></div>
              );
            })}
          </div>
          <button
            className='blue-btn-modal'
            onClick={(ev) => {
              ev.stopPropagation();
              saveLabel();
            }}
          >
            Save
          </button>
          {/* <button onClick={() => setEditMode(!editMode)}>go back</button> */}
        </div>
      )}
    </div>
  );
}

export function Move({ board, moveCardToOtherList, toggleModal, type }) {
  const [selectedGroup, setSelectedGroup] = useState(board.groups[0]);
  const [selectedPosition, setSelectedPosition] = useState(0);

  function handleListChange({ target }) {
    let selectedGroup = board.groups.find((group) => group.id === target.value);
    setSelectedGroup(selectedGroup);
  }

  function handlePositionChange({ target }) {
    setSelectedPosition(target.value);
  }

  function moveCard() {
    moveCardToOtherList(selectedGroup, selectedPosition, 'move');
    toggleModal('moveModal');
  }

  function copyCard() {
    moveCardToOtherList(selectedGroup, selectedPosition, 'copy');
    toggleModal('moveModalCopy');
  }

  return (
    <div
      className='details-modal move-modal'
      onClick={(ev) => ev.stopPropagation()}
    >
      {type === 'move' && (
        <section className='details-modal-top'>
          <span>Move</span>
          <img
            src={xsvg}
            onClick={(ev) => {
              ev.stopPropagation();
              toggleModal('moveModal');
            }}
          />
        </section>
      )}
      {type === 'copy' && (
        <section className='details-modal-top'>
          <span>Copy</span>
          <img
            src={xsvg}
            onClick={(ev) => {
              ev.stopPropagation();
              toggleModal('moveModalCopy');
            }}
          />
        </section>
      )}

      <main className='details-modal-content'>
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
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              moveCard();
            }}
          >
            MOVE
          </button>
        </section>
      )}
      {type === 'copy' && (
        <section className='move-button'>
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              copyCard();
            }}
          >
            Copy
          </button>
        </section>
      )}
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
    this.props.addDate(this.state.selectedDay);
    this.props.toggleModal('dates');
  };

  render() {
    return (
      <div
        className='details-modal Dates'
        onClick={(ev) => ev.stopPropagation()}
      >
        <section className='details-modal-top'>
          <span>Date</span>
          <img
            onClick={(ev) => {
              ev.stopPropagation();
              this.props.toggleModal('dates');
            }}
            src={xsvg}
            alt=''
          />
        </section>
        <section className='details-modal-content'>
          <DayPicker
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
          />
          <p>
            <button
              className='blue-btn-modal'
              onClick={(ev) => {
                ev.stopPropagation();
                this.saveDate();
              }}
            >
              save
            </button>
          </p>
        </section>
      </div>
    );
  }
}
