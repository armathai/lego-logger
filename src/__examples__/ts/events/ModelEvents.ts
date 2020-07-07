export const ModelEvents = Object.freeze({
  ObservableModel: {
    UuidUpdate: 'ObservableModelUuidUpdate',
  },
  Store: {
    GameModelUpdate: 'StoreGameModelUpdate',
    PlayerModelUpdate: 'StorePlayerModelUpdate',
  },
  GameModel: {
    LevelUpdate: 'GameModelLevelUpdate',
  },
  LevelModel: {
    BoardUpdate: 'LevelModelBoardUpdate',
  },
  BoardModel: {
    CellsUpdate: 'BoardModelCellsUpdate',
  },
  CellModel: {
    ScoreUpdate: 'CellModelScoreUpdate',
    PositionUpdate: 'CellModelPositionUpdate',
  },
  PlayerModel: {
    ScoreUpdate: 'PlayerModelScoreUpdate',
  },
});