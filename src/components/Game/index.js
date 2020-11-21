import cx from 'classnames';
import style from './style.module.scss';
import { useState, useEffect } from 'react';

let direction = '';

const getAnsMatrix = len => {
  const PowLen = Math.pow(len, 2);
  return [...Array(PowLen).keys()].map(i => (i + 1) % PowLen );
};

const isCanMove = ({ curMatrix, index, len }) => {
  const ClickValue = curMatrix[index];
  if(!ClickValue) return false;

  const holeIndex = curMatrix.indexOf(0);
  const hiModLen = holeIndex % len;

  const canClickList = [];
  for (let i = 0; i < len; i++) {
    canClickList.push(hiModLen + i * len);
    canClickList.push(holeIndex - hiModLen + i);
  }
  return canClickList.filter(v => v !== holeIndex).includes(index);
};

const swapHoleToIndex = ({ STEP, curMatrix, index, holeIndex}) => {
  const tmp = [...curMatrix];
  let swapIndex = holeIndex + STEP;
  do {
    [ tmp[swapIndex], tmp[swapIndex - STEP]] =
    [ tmp[swapIndex - STEP], tmp[swapIndex]];
    swapIndex += STEP;
  } while (tmp[index]);
  return tmp;
};

// const isValid
export function Game({ len }) {

  const AnsMatrix = getAnsMatrix(len);
  const [movingIndex, setMovingIndex] = useState([]);
  const [curMatrix, setCurMatrix] = useState([...AnsMatrix]);

  useEffect(() => {
    setCurMatrix(getAnsMatrix(len));
  }, [len]);

  const handleClick = index => {
    if(!isCanMove({ curMatrix, index, len })) return;
    const holeIndex = curMatrix.indexOf(0);
    const D = index - holeIndex;
    const STEP = Math.sign(D) * (Math.abs(D) < len ? 1: len);
    console.log(D);
    direction = D > 0 ?
      Math.abs(D) >= len ? 'up': 'left':
      Math.abs(D) >= len ? 'down': 'right';
    console.log(direction);
    const moveIndexList = [];
    for (let i = holeIndex; i !== index; i+=STEP) {
      moveIndexList.push(i+STEP);
    }
    setMovingIndex(moveIndexList);

    setTimeout(() => {
      setMovingIndex([]);
      setCurMatrix(swapHoleToIndex({
        STEP,
        index,
        curMatrix,
        holeIndex,
      }));
    }, 200);
  };

  const DP = (100 / len) + '%';

  return (
    <div className={style.Game}>
      {AnsMatrix.map((value, index) =>
        <div
          key={value}
          className={cx(style.item, {
            [style.isMoving]: movingIndex.includes(index),
            [style[direction]]: movingIndex.includes(index),
          })}
          data-value={curMatrix[index]}
          onClick={handleClick.bind(this, index)}
          style={{ width: `calc(` + DP + ` - 5px)` }}
        />
      )}
    </div>
  );
}
