import cx from 'classnames';
import style from './style.module.scss';
import { useState, useEffect } from 'react';
import {
  isCanMove,
  getAnsMatrix,
  getCanClickList,
  swapHoleToIndex,
} from '../../utils';

let direction = '';

// const isValid
export function Game({ len }) {

  const AnsMatrix = getAnsMatrix(len);
  const [movingIndex, setMovingIndex] = useState([]);
  const [curMatrix, setCurMatrix] = useState([...AnsMatrix]);

  useEffect(() => {
    // 打亂它！
    const curMatrix = getAnsMatrix(len);

    let result = [...curMatrix];
    for (let i = 0; i < ~~(20 * Math.random()) + 10; i++) {
      const { canClickList } = getCanClickList(result);
      const index = canClickList[~~(Math.random() * canClickList.length)];
      result = swapHoleToIndex({curMatrix: [...result], index});
    }

    setCurMatrix(result);
  }, [len]);

  const handleClick = index => {
    if(!isCanMove({ curMatrix, index, len })) return;

    const holeIndex = curMatrix.indexOf(0);
    const D = index - holeIndex;
    const STEP = Math.sign(D) * (Math.abs(D) < len ? 1: len);
    direction = D > 0 ?
      Math.abs(D) >= len ? 'up': 'left':
      Math.abs(D) >= len ? 'down': 'right';
    console.log(direction);
    const moveIndexList = [];
    for (let i = holeIndex; i !== index; i+=STEP) {
      moveIndexList.push(i + STEP);
    }
    setMovingIndex(moveIndexList);

    setTimeout(() => {
      setMovingIndex([]);
      const result = swapHoleToIndex({
        index,
        curMatrix,
      });
      setCurMatrix(result);
      if(result.join('') === AnsMatrix.join('')) {
        alert('win!');
      }
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
          onTouchStart={handleClick.bind(this, index)}
          style={{ width: `calc(` + DP + ` - 5px)` }}
        />
      )}
    </div>
  );
}
