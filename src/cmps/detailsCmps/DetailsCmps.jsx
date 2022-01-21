import React, { useEffect, useState } from 'react';

export function DetailscheckList({
  getCheckListDontPrecents,
  card,
  saveItemToCheckList,
  checkList,
  idx,
  updateCheckList,
}) {
  const [isAddItemMode, setAddItemMode] = useState(false);
  const [item, setItem] = useState('');

  function handleChange({ target }) {
    setItem(target.value);
  }

  function handleCheckBoxChange(itemIdx) {
    // console.log(itemIdx);
    const newCheckList = checkList;
    newCheckList.items[itemIdx].isDone = checkList.items[itemIdx].isDone;
    updateCheckList(newCheckList, idx, itemIdx);
  }

  function AddItem() {
    saveItemToCheckList(item, idx);
    setAddItemMode(false);
    setItem('');
  }

  function getItemsDonePrecent() {
    const itemsNum = checkList.items.length;
    let count = 0;
    checkList.items.forEach((item) => {
      if (item.isDone === true) count++;
    });

    return count / itemsNum;
  }
  return (
    <div className='checklist'>
      {/* {console.log(checkList)} */}
      <div className='checklist'>
        <h2>{checkList.title}</h2>

        <meter value={getItemsDonePrecent()}></meter>
        <br />
        {checkList.items.length > 0 && (
          <div>
            {checkList.items.map((item, idx) => {
              return (
                <div key={idx}>
                  <input
                    onChange={() => handleCheckBoxChange(idx)}
                    type='checkbox'
                  />
                  <span>{item.txt}</span>
                </div>
              );
            })}
          </div>
        )}

        {!isAddItemMode && (
          <button
            onClick={() => {
              setAddItemMode(!isAddItemMode);
            }}
          >
            Add an item
          </button>
        )}

        {isAddItemMode && (
          <div>
            <textarea
              value={item}
              onChange={handleChange}
              placeholder='Add an item..'
            ></textarea>
            <button onClick={AddItem}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
}
