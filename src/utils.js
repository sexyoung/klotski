const getAnsMatrix = len => {
  const PowLen = Math.pow(len, 2);
  return [...Array(PowLen).keys()].map(i => (i + 1) % PowLen );
};

const getCanClickList = curMatrix => {
  const len = Math.sqrt(curMatrix.length);
  const holeIndex = curMatrix.indexOf(0);
  const hiModLen = holeIndex % len;
  let canClickList = [];
  for (let i = 0; i < len; i++) {
    canClickList.push(hiModLen + i * len);
    canClickList.push(holeIndex - hiModLen + i);
  }
  canClickList= canClickList.filter(v => v !== holeIndex);
  return { holeIndex, canClickList };
};

const isCanMove = ({ curMatrix, index }) => {
  const ClickValue = curMatrix[index];
  if(!ClickValue) return false;

  const { holeIndex, canClickList } = getCanClickList(curMatrix);
  return canClickList.filter(v => v !== holeIndex).includes(index);
};

const swapHoleToIndex = ({ curMatrix, index }) => {
  const holeIndex = curMatrix.indexOf(0);
  const D = index - holeIndex;
  const len = Math.sqrt(curMatrix.length);
  const STEP = Math.sign(D) * (Math.abs(D) < len ? 1: len);

  const tmp = [...curMatrix];
  let swapIndex = holeIndex + STEP;
  do {
    [ tmp[swapIndex], tmp[swapIndex - STEP]] =
    [ tmp[swapIndex - STEP], tmp[swapIndex]];
    swapIndex += STEP;
  } while (tmp[index]);
  return tmp;
};

export {
  isCanMove,
  getAnsMatrix,
  getCanClickList,
  swapHoleToIndex,
};