import React, { useEffect, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export function Members() {
  return <div className='details-modal members'>members</div>;
}

export function Checklist() {
  return <div className='details-modal Cheklist'>Cheklist</div>;
}

export function Attachment() {
  return <div className='details-modal Attachment'>Attachment</div>;
}

export function Cover() {
  return <div className='details-modal Cover'>Cover</div>;
}

export function Labels({ addLabel }) {
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
      label.id === editLabel.id ? editLabel : label;
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
      <h3 className='labels-headline'> Labels</h3>
      <hr />

      {!editMode && (
        <div>
          <div className='labels-input'>
            <input placeholder='search for label' type='text' />
          </div>
          {labels.map((label, idx) => {
            return (
              <div key={idx} className='label-row'>
                <div
                  onClick={() => addLabel(label)}
                  className={' label label-' + label.color}
                >
                  {label.name}
                </div>
                <button onClick={() => setEditMode(!editMode)}>edit</button>
              </div>
            );
          })}
        </div>
      )}

      {editMode && (
        <div>
          <input
            onChange={handleEditLabelChange}
            value={editLabel.name}
            placeholder='Name'
            type='text'
          />
          <h4>labels</h4>
          <h4>Select a color</h4>
          <div className='edit-labels'>
            {labels.map((label, idx) => {
              return (
                <div
                  onClick={() => markChosen(label)}
                  className={'edit-label label-' + label.color}
                  key={idx}
                >
                  {label.name}
                </div>
              );
            })}
          </div>
          <button onClick={saveLabel}>Save</button>
          <button onClick={() => setEditMode(!editMode)}>go back</button>
        </div>
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
    this.props.addDate(this.state.selectedDay.toLocaleDateString());
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
