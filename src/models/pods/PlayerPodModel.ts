import { Point } from '../../Point';
import { PodModel, TickData } from './PodModel';

export class PlayerPodModel extends PodModel {
  protected getCoordinates({ inputData }: TickData): Point {
    return inputData.playerPodCoordinates;
  }
}
