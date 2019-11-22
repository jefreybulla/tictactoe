import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//Since Square does not have a state and its only method is render, we can express it as a function component.
function Square(props) {
  return(
    <button className="square" onClick={props.myMethod}>
      {props.value}
    </button>
  )
}


//Board component is the parent of Sqaure and a child of Game
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i){
    //use .slice() to create a copy of the squares array to modify instead of modifying the existing array.
    const squares = this.state.squares.slice();
    const winner = this.calculateWinner();
    if(winner || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculateWinner(){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const squares = this.state.squares;
    for(let i=0 ;i<8; i++){
      let [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ){
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        myMethod={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let winner = this.calculateWinner();
    let status;
    if (winner){
      status = `${winner} is the winner! `
    }
    else{
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <h3>Tic Tac Toe. Built with React</h3>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
