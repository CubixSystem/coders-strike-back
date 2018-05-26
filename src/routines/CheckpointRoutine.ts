import { GameTick } from '../GameTick';
import { Routine, RoutinePriority, RoutineResult } from './Routine';

export class CheckpointRoutine extends Routine {
  public readonly duration = 1;
  public readonly priority = RoutinePriority.NORMAL;

  public execute({ frameData }: GameTick): RoutineResult {
    return {
      id: this.constructor.name,
      targetPoint: frameData.nextCheckpoint,
      thrustValue: 0,
    };
  }

  public isAvaliable({
    playerMapModel: {
      isPassCheckpoint,
      angleBetweenNextCheckpointAndMovementVector,
    },
  }: GameTick): boolean {
    return (
      isPassCheckpoint && angleBetweenNextCheckpointAndMovementVector! > 60
    );
  }
}
