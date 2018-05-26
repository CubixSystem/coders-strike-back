import { FrameData } from './FrameData';
import { MapModel, PlayerPodModel } from './models';

export interface GameTick {
  playerMapModel: MapModel;
  playerPodModel: PlayerPodModel;
  frameData: FrameData;
}
