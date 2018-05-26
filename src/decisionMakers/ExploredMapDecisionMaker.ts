import { GameTick } from '../GameTick';
import {
  BoostRoutine,
  CheckpointRoutine,
  MoveRoutine,
  RotatetoCheckpointRoutine,
  Routine,
} from '../routines';
import { DecisionMaker } from './DecisionMaker';

export class ExploredMapDecisionMaker extends DecisionMaker {
  protected highPriorityRoutines: Set<Routine> = new Set([
    new BoostRoutine({ boostCount: 1 }),
  ]);

  protected normalPriorityRoutines: Set<Routine> = new Set([
    new CheckpointRoutine(),
    new RotatetoCheckpointRoutine(),
  ]);

  protected lowPriorityRoutines: Set<Routine> = new Set([new MoveRoutine()]);

  public onGameTick(newTickData: GameTick): void {
    this.calculate(newTickData);
    this.printCommonDebugInfo(newTickData);
  }

  protected calculate(tickData: GameTick): void {
    const { playerMapModel } = tickData;
    const angleToNextCheckpoint = playerMapModel.angleToNextCheckpoint;
    const nextCheckpoint = playerMapModel.nextCheckpoint;
    const distToNextCheckpoint = playerMapModel.distToNextCheckpoint;
    const angleBetweenSegments = playerMapModel.angleBetweenSegments;

    if (angleToNextCheckpoint === undefined) {
      throw new Error('angleToNextCheckpoint not defined');
    }

    if (nextCheckpoint === undefined) {
      throw new Error('nextCheckpoint not defined');
    }

    if (distToNextCheckpoint === undefined) {
      throw new Error('distToNextCheckpoint not defined');
    }

    if (angleBetweenSegments === undefined) {
      throw new Error('angleBetweenSegments not defined');
    }

    if (distToNextCheckpoint === undefined) {
      throw new Error('distToNextCheckpoint not defined');
    }

    // if (Math.abs(angleBetweenSegments) < 100 && distToNextCheckpoint < 2500) {
    //   this.thrustValue = 30;
    //   return this.outputDecision("2.1");
    // }

    const avaliableRoutine = [
      ...Array.from(this.highPriorityRoutines),
      ...Array.from(this.normalPriorityRoutines),
      ...Array.from(this.lowPriorityRoutines),
    ].find(routine => routine.isAvaliable(tickData));

    if (avaliableRoutine) {
      this.outputDecision(avaliableRoutine.execute(tickData));
    } else {
      throw new Error('No avaliable routine found');
    }
  }
}
