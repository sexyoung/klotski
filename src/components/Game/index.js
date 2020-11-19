import { useState } from 'react';
import style from './style.module.scss';

const getAnsMatrix = len => {
  const PowLen = Math.pow(len, 2);
  return [...Array(PowLen).keys()].map(i =>
    (i + 1) % PowLen
  );
};

// const isValid
export function Game({ len }) {

  const AnsMatrix = getAnsMatrix(len);
  // const [curMatrix, setCurMatrix] = useState([...AnsMatrix]);
  const [curMatrix, setCurMatrix] = useState([
    1,2,3,4,5,6,7,8,9,0,11,12,1,1,1,14
  ]);

  const handleClick = index => {
    const ClickValue = curMatrix[index];
    const holeIndex = curMatrix.indexOf(0);
    if(!ClickValue) return;
    const voleIndex = ~~(holeIndex / len);
    console.log(`holeIndex is ${holeIndex}`);
    const hiModLen = holeIndex % len;
    const viModLen = voleIndex % len;
    console.log(`minH is ${holeIndex - hiModLen}`);
    console.log(`maxH is ${holeIndex + (len - 1 - hiModLen)}`);
    console.log(`minV is ${viModLen - viModLen}`);
    console.log(`maxV is ${viModLen + (len - 1 - viModLen)}`);
  };

  return (
    <div className={style.Game}>
      {AnsMatrix.map((value, index) =>
        <div
          key={value}
          className={style.item}
          data-value={curMatrix[index]}
          onClick={handleClick.bind(this, index)}
          style={{ width: `calc(` + (100 / len) + `% - 5px)` }}
        />
      )}
    </div>
  );
}
