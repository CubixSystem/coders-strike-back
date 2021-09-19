import { GameTick } from '../GameTick';
import { routinesRegistry as rr } from '../routines';
import { DecisionMaker } from './DecisionMaker';

export class ExploredMapDecisionMaker extends DecisionMaker {
  protected highPriorityRoutines = [rr.boostRoutine];

  protected normalPriorityRoutines = [
    rr.checkpointRoutine,
    rr.rotateToCheckpointRoutine,
  ];

  protected lowPriorityRoutines = [rr.moveRoutine];

  public onGameTick(newTickData: GameTick): void {
    this.calculate(newTickData);
    this.printCommonDebugInfo(newTickData);
  }

  protected calculate(tickData: GameTick): void {
    // if (Math.abs(angleBetweenSegments) < 100 && distToNextCheckpoint < 2500) {
    //   this.thrustValue = 30;
    //   return this.outputDecision("2.1");
    // }

    const avaliableRoutine = [
      ...this.highPriorityRoutines,
      ...this.normalPriorityRoutines,
      ...this.lowPriorityRoutines,
    ].find((routine) => routine.isAvaliable(tickData));

    if (avaliableRoutine) {
      this.outputDecision(avaliableRoutine.execute(tickData));
    } else {
      throw new Error('No avaliable routine found');
    }
  }
}
