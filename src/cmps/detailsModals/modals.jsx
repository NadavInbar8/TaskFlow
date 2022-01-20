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
  const setLable = () => {
    addLabel();
  };
  const labels = [
    { color: 'green', name: '' },
    { color: 'yellow', name: '' },
    { color: 'orange', name: '' },
    { color: 'red', name: '' },
    { color: 'purple', name: '' },
    { color: 'blue', name: '' },
    { color: 'dark-blue', name: '' },
  ];
  return (
    <div className='details-modal labels-modal'>
      <h3 className='labels-headline'> Labels</h3>
      <hr />

      {!editMode && (
        <div>
          <div className='labels-input'>
            <input placeholder='search for label' type='text' />
          </div>
          {labels.map((label) => {
            return (
              <div className='label-row'>
                <div
                  onClick={() => addLabel(label.color)}
                  className={' label label-' + label.color}
                  label
                ></div>
                <button onClick={() => setEditMode(!editMode)}>edit</button>
              </div>
            );
          })}
        </div>
      )}

      {editMode && (
        <div>
          <button onClick={() => setEditMode(!editMode)}>go back</button>
          <input placeholder='Name' type='text' />
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
