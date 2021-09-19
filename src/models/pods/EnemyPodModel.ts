import { Point } from '../../Point';
import { PodModel, TickData } from './PodModel';

export class EnemyPodModel extends PodModel {
  protected getCoordinates({ inputData }: TickData): Point {
    return inputData.enemyPodCoordinates;
  }
}
