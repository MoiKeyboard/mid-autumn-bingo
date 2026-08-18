// src/utils/storage.ts

export type GameId = 
  | 'tangram' | 'quiz' | 'pair' | 'photo' // Online 
  | 'riddles' | 'dice' | 'pitching' | 'chopsticks' | 'shuttlecock'; // Offline

export interface BingoState {
  completedGames: GameId[];
}

const BINGO_STATE_KEY = 'bingo_state_2026';

export const getBingoState = (): BingoState => {
  const saved = localStorage.getItem(BINGO_STATE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return { completedGames: [] };
};

export const saveBingoState = (state: BingoState) => {
  localStorage.setItem(BINGO_STATE_KEY, JSON.stringify(state));
};

export const markGameComplete = (gameId: GameId) => {
  const state = getBingoState();
  if (!state.completedGames.includes(gameId)) {
    state.completedGames.push(gameId);
    saveBingoState(state);
  }
};

export const isGameComplete = (gameId: GameId): boolean => {
  const state = getBingoState();
  return state.completedGames.includes(gameId);
};

export const checkWinCondition = (completed: GameId[], grid: GameId[][]): boolean => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (grid[i].every(game => completed.includes(game))) return true;
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (grid.every(row => completed.includes(row[j]))) return true;
  }
  // Check diagonals
  if (completed.includes(grid[0][0]) && completed.includes(grid[1][1]) && completed.includes(grid[2][2])) return true;
  if (completed.includes(grid[0][2]) && completed.includes(grid[1][1]) && completed.includes(grid[2][0])) return true;
  
  return false;
};
