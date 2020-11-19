import style from './style.module.scss';

export function Square(props) {
  return (
    <div className={style.body}>
      <div className={style.square}>
        {props.children}
      </div>
    </div>
  );
}
