import { Point } from '../../Point';
import { PodModel, TickData } from './PodModel';

export class EnemyPodModel extends PodModel {
  protected getCoordinates(newTickData: TickData): Point {
    return newTickData.frameData.enemyPod;
  }
}
