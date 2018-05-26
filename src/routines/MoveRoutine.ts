import { GameTick } from '../GameTick';
import { Routine, RoutinePriority, RoutineResult } from './Routine';

export class MoveRoutine extends Routine {
  public readonly duration = 1;
  public readonly priority = RoutinePriority.LOW;

  public execute({ frameData }: GameTick): RoutineResult {
    return {
      id: this.constructor.name,
      targetPoint: frameData.nextCheckpoint,
      thrustValue: 100,
    };
  }

  public isAvaliable(): boolean {
    return true;
  }
}
