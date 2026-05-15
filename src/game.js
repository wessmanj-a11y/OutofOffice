import { positions, starterHand, drawCard } from './cards';

export function createGame() {
  return {
    rank: 0,
    burnout: 0,
    sanity: 5,
    hand: starterHand(),
    log: ['Welcome to OUT OF OFFICE. Survive corporate absurdity.'],
    gameOver: false,
    result: ''
  };
}

export function playTurn(state, cardInstance) {
  if (state.gameOver) return state;
  const card = state.hand.find(c => c.instance === cardInstance);
  if (!card) return state;

  let rank = Math.min(positions.length - 1, state.rank + (card.rank || 0));
  let burnout = Math.max(0, state.burnout + (card.burnout || 0));
  let sanity = Math.max(0, state.sanity + (card.sanity || 0));

  let gameOver = false;
  let result = '';

  if (rank >= positions.length - 1) {
    gameOver = true;
    result = 'You reached CEO. Your inbox becomes your final form.';
  }

  if (sanity >= 20) {
    gameOver = true;
    result = 'You escaped the rat race. Out of office forever.';
  }

  if (burnout >= 12) {
    gameOver = true;
    result = 'Burnout maxed out. You were consumed by meetings.';
  }

  return {
    ...state,
    rank,
    burnout,
    sanity,
    hand: [...state.hand.filter(c => c.instance !== cardInstance), drawCard()],
    log: [card.name + ': ' + card.flavor, ...state.log],
    gameOver,
    result
  };
}
