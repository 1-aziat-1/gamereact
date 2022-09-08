import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Введите число',
    userNumber: '',
    randomNumber:
      Math.floor(Math.random() * (this.props.max - this.props.min + 1)) + this.props.min,
    count: 0,
    isWin: true,
  };

  handleSubmit = e => {
    console.log(e.target);
    e.preventDefault();

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загадонного`,
          userNumber: '',
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загадонного`,
          userNumber: '',
        };
      }

      return {
        result: `Вы угадали, загадонное число ${state.userNumber},
        попыток ${state.count}`,
        userNumber: '',
        isWin: !this.state.isWin,
      };
    });
  };

  handelChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    }
    );
    console.log(this.state);
  };

  clickBtn = () => {
    if (!this.state.isWin) {
      this.setState({
        isWin: !this.state.isWin,
        count: 0,
        randomNumber:
          Math.floor(Math.random() * (this.props.max - this.props.min + 1)) + this.props.min,
      });
      console.log(this.state);
    } else {
      this.setState({
        count: this.state.count + 1,
      });
    }
  };


  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handelChange} value={this.state.userNumber}/>
          <button className={style.btn} onClick={this.clickBtn}>
            {this.state.isWin ? 'Угадать' : 'Сыграть ещё'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
