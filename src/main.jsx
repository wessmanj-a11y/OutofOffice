import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { positions } from './cards';
import { createGame, playTurn } from './game';

function cardClass(type){ return type === 'memo' ? 'memo' : type === 'pto' ? 'pto' : 'position'; }

function App(){
  const [game, setGame] = useState(createGame());

  return (
    <div className='app'>
      <div className='header'>
        <div className='title'>OUT OF OFFICE</div>
        <div className='tag'>Climb. Burn Out. Escape.</div>
      </div>

      {game.gameOver && (
        <div className={game.result.includes('escaped') || game.result.includes('CEO') ? 'win' : 'lose'}>
          {game.result}
        </div>
      )}

      <div className='dashboard'>
        <div className='panel'>Burnout<br />{game.burnout}/12</div>
        <div className='panel'>Sanity<br />{game.sanity}/20</div>
        <div className='panel'>Position<br />{positions[game.rank]}</div>
      </div>

      <div className='ladder'>
        {positions.map((p,i)=><div key={p} className={i===game.rank ? 'active' : 'rung'}>{p}</div>)}
      </div>

      <div className='hand'>
        {game.hand.map(card => (
          <div key={card.instance} className={`card ${cardClass(card.type)}`} onClick={() => setGame(playTurn(game, card.instance))}>
            <div>
              <strong>{card.name}</strong>
              <p>{card.flavor}</p>
            </div>
            <div className='chaos'>{card.rarity} • {card.type.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div className='feed'>
        <h3>Corporate Feed</h3>
        {game.log.slice(0,8).map((entry,idx)=><p key={idx}>{entry}</p>)}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
