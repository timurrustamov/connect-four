export type UserId = number;
export type BoardGrid = (UserId | undefined)[];

export type BoardGridWithId = {
  value: BoardGrid[0],
  index: number
}

export enum MatchState {
  Menu,
  InGame,
  Draw,
  Results
}

export type State = {
  board: {
    grid: BoardGrid,
    options: {
      boardHeight: number,
      boardWidth: number
    }
  },
  currentUser: UserId,
  match: {
    state: MatchState,
    winner?: UserId,
    winningSequence: number[]
  },
  illegalMoves: {
    columnId: number,
    userId: number
  }[],
  options: {
    players: number,
    grid: {
      boardHeight: number,
      boardWidth: number
    }
  }
};

export const createState = (boardWidth = 7, boardHeight = 6): State => ({
  board: {
    grid: Array(boardHeight * boardWidth).fill(undefined),
    options: {
      boardHeight,
      boardWidth
    }
  },
  currentUser: 0,
  match: {
    state: MatchState.InGame,
    winningSequence: []
  },
  illegalMoves: [],
  options: {
    players: 2,
    grid: {
      boardHeight,
      boardWidth
    }
  }
});

export const DefaultState = createState();

export default DefaultState;