import React, { useEffect, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import paint from '../../assets/imgs/paint.svg';
import arrowleft from '../../assets/imgs/arrowleft.svg';

export function Members() {
  return <div className='details-modal members'>this is the members modal</div>;
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
      <h4>Checklist</h4>
      <hr />
      <div className='cheklist-content'>
        <h5>Title</h5>
        <form onSubmit={saveCheckList}>
          <input value={checkList.title} onChange={handleChange} type='text' />
          <button>Add</button>
        </form>
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

  function saveLink() {
    const attachment = { link, name, createdAt: Date.now() };
    console.log(attachment);
    attachLink(attachment);
    toggleModal('attachment');
  }

  return (
    <div className='details-modal attachment'>
      <div className='attachment-layout'>
        <section className='attachment-top'>
          <span> </span>
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
        <h3>Computer</h3>
        <hr />
        <section className='attachment-main'>
          <h3>Attach a link</h3>
          <input onChange={handleChange} name='link' value={link} type='text' />
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
          <span> </span>
          <h3>Cover</h3>
          <button
            onClick={() => {
              toggleModal('cover');
            }}
          >
            x
          </button>
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

export function Labels({ addLabel, toggleModal }) {
  const [editMode, setEditMode] = useState(false);

  const [labels, setLabels] = useState([
    { id: 1, color: 'green', name: 'light' },
    { id: 2, color: 'yellow', name: 'soon' },
    { id: 3, color: 'orange', name: 'company fun' },
    { id: 4, color: 'red', name: 'important' },
    { id: 5, color: 'purple', name: 'at night' },
    { id: 6, color: 'blue', name: 'vacation' },
    { id: 7, color: 'dark-blue', name: 'meeting' },
  ]);
  const [editLabel, setEditLabel] = useState({
    id: 1234,
    color: 'red',
    name: 'choose',
  });

  function markChosen(label) {
    console.log(label);
    setEditLabel(label);
  }
  function handleEditLabelChange({ target }) {
    console.log(target.value);
    setEditLabel({ ...editLabel, name: target.value });
  }

  function saveLabel() {
    console.log(editLabel);
    console.log(labels);
    let newLabels = labels;
    newLabels.map((label) => {
      return label.id === editLabel.id ? editLabel : label;
    });
    setLabels(newLabels);
    addLabel(editLabel);
    setEditLabel({
      id: 1234,
      color: 'red',
      name: 'choose',
    });
  }

  return (
    <div className='details-modal labels-modal'>
      <section className='labels-modal-layout'>
        <section className='labels-modal-top'>
          <img onClick={() => setEditMode(!editMode)} src={arrowleft} />
          <h3> Labels</h3>
          <button onClick={() => toggleModal('labels')}>X</button>
        </section>
        <hr />

        {!editMode && (
          <div className='labels-modal-main'>
            <div className='labels-input'>
              <input placeholder='Search labels...' type='text' />
            </div>
            <div className='labels-modal'>
              {labels.map((label, idx) => {
                return (
                  <div key={idx} className='label-row'>
                    <div
                      onClick={() => addLabel(label)}
                      className={' label label-' + label.color}
                    ></div>
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
    this.props.toggleModal('dates');
  };

  render() {
    return (
      <div className='details-modal Dates'>
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
        <p>
          <button onClick={this.saveDate}>save</button>
        </p>
      </div>
    );
  }
}
