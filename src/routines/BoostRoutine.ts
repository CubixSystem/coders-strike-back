import { GameTick } from '../GameTick';
import { Routine, RoutinePriority, RoutineResult } from './Routine';

export class BoostRoutine extends Routine {
  public readonly duration = 1;
  public readonly priority = RoutinePriority.HIGH;
  protected boostCount: number = 1;

  constructor({ boostCount }: { boostCount: number }) {
    super();
    this.boostCount = boostCount;
  }

  public execute({ frameData }: GameTick): RoutineResult {
    this.boostCount--;
    return {
      id: this.constructor.name,
      targetPoint: frameData.nextCheckpoint,
      thrustValue: 'BOOST',
    };
  }

  public isAvaliable({ frameData }: GameTick): boolean {
    return this.boostCount > 0 && frameData.distToNextCheckpoint > 3000;
  }
}
