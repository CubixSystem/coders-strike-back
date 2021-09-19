import { GameTickInputData } from './GameTickInputData';
import { MapModel, PlayerPodModel } from './models';

export interface GameTick {
  playerMapModel: MapModel;
  playerPodModel: PlayerPodModel;
  inputData: GameTickInputData;
}
