import style from './App.module.scss';
import { useState } from "react";
import {
  Game,
  Square,
} from "components";

function App() {

  const [ len, setLen ] = useState(3);

  const handleChange = ({ target }) => {
    setLen(+target.value);
  };

  return (
    <div className={style.App}>
      <select value={len} onChange={handleChange}>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <Square>
        <Game {...{ len }} />
      </Square>
    </div>
  );
}

export default App;
