import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function Colors({ addBG, parentCmp, changeBG }) {
  const [colors, setColors] = useState([
    'bc-blue',
    'bc-orange',
    'bc-dark-green',
    'bc-red',
    'bc-purple',
    'bc-pink',
    'bc-light-green',
    'bc-cyan',
  ]);
  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));

  useEffect(() => {
    getColorsForMap();
  }, [modal]);

  const getColorsForMap = () => {
    if (parentCmp === 'boardMenu') {
      setColors([
        'bc-blue',
        'bc-orange',
        'bc-dark-green',
        'bc-red',
        'bc-purple',
        'bc-pink',
        'bc-light-green',
        'bc-cyan',
      ]);
    } else if (parentCmp === 'createModal') {
      setColors([
        'bc-blue',
        'bc-orange',
        'bc-dark-green',
        'bc-red',
        'bc-purple',
        'bc-pink',
      ]);
    }
  };

  const getColors = (color) => {
    if (color === 'bc-blue') return 'rgb(0, 121, 191)';
    else if (color === 'bc-orange') return 'rgb(210, 144, 52)';
    else if (color === 'bc-dark-green') return 'rgb(81, 152, 57)';
    else if (color === 'bc-red') return 'rgb(176, 70, 50)';
    else if (color === 'bc-purple') return 'rgb(137, 96, 158)';
    else if (color === 'bc-pink') return 'rgb(205, 90, 145)';
    else if (color === 'bc-light-green') return 'rgb(75, 191, 107)';
    else if (color === 'bc-cyan') return 'rgb(0, 174, 204)';
  };

  const onSaveColor = (color) => {
    const actualColor = getColors(color);
    if (parentCmp === 'createModal') {
      addBG('color', actualColor);
    } else if (parentCmp === 'boardMenu') {
      changeBG('color', actualColor);
    }
  };

  return (
    <div className='board-background'>
      <div className={`colors-grid-${parentCmp} m-y-m`}>
        {colors.map((color, idx) => {
          return (
            <div
              onClick={() => onSaveColor(color)}
              key={idx}
              className={`${color} color-div-${parentCmp} flex flex-center`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
