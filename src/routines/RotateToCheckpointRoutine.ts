import { GameTick } from '../GameTick';
import { Routine, RoutinePriority, RoutineResult } from './Routine';

export class RotatetoCheckpointRoutine extends Routine {
  public readonly duration = 1;
  public readonly priority = RoutinePriority.NORMAL;

  public execute({
    frameData,
    playerMapModel: { angleToNextCheckpoint },
  }: GameTick): RoutineResult {
    return {
      id: this.constructor.name,
      targetPoint: frameData.nextCheckpoint,
      thrustValue: 100 * 80 / Math.abs(angleToNextCheckpoint!),
    };
  }

  public isAvaliable({
    playerMapModel: { angleToNextCheckpoint },
  }: GameTick): boolean {
    return Math.abs(angleToNextCheckpoint!) > 80;
  }
}
