import React, { useEffect, useState } from 'react';
import trash from '../../assets/imgs/archive.svg';

import checklistSvg from '../../assets/imgs/checklist.svg';
export function DetailscheckList({
  getCheckListDontPrecents,
  card,
  saveItemToCheckList,
  checkList,
  idx,
  updateCheckList,
  deleteItemFromCheckList,
  deleteCheckList,
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
    if (!itemsNum) return 0;
    let count = 0;
    checkList.items.forEach((item) => {
      if (item.isDone === true) count++;
    });

    return count / itemsNum;
  }

  function deleteItem(itemIdx) {
    deleteItemFromCheckList(idx, itemIdx);
  }

  return (
    <div className='checklist'>
      {/* {console.log(checkList)} */}

      <div className='top'>
        <section className='top-title'>
          <div className='flex left-container'>
            <img className='details-larger-svg' src={checklistSvg} alt='' />
            <h3>{checkList.title}</h3>
          </div>
          <div className='span-button'>
            <span
              className='flex-center pointer'
              onClick={() => {
                deleteCheckList(idx);
              }}
              // src={trash}
            >
              Delete
            </span>
          </div>
        </section>
      </div>

      <main className='checklist-container'>
        <section className='meter-section'>
          <span>{Math.floor(getItemsDonePrecent() * 100)}%</span>
          <meter
            value={getItemsDonePrecent() * 100}
            min='0'
            low='40'
            max='100'
          ></meter>
        </section>
        <br />
        {checkList.items.length > 0 && (
          <div>
            {checkList.items.map((item, idx) => {
              return (
                <div className='checklist-item' key={idx}>
                  <div>
                    <input
                      className='checkbox-checklist-input'
                      onChange={() => handleCheckBoxChange(idx)}
                      type='checkbox'
                      checked={item.isDone}
                      // value={true}
                    />
                    <span>{item.txt}</span>
                  </div>
                  <img onClick={() => deleteItem(idx)} src={trash} />
                </div>
              );
            })}
          </div>
        )}

        {!isAddItemMode && (
          <div className='span-button'>
            <span
              onClick={() => {
                setAddItemMode(!isAddItemMode);
              }}
            >
              Add an item
            </span>
          </div>
        )}

        {isAddItemMode && (
          <div className='gap-right'>
            <textarea
              value={item}
              onChange={handleChange}
              placeholder='Add an item..'
            ></textarea>
            <button onClick={AddItem}>Add</button>
          </div>
        )}
      </main>
    </div>
  );
}
