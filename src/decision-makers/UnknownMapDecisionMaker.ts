import { GameTick } from '../GameTick';
import { routinesRegistry as rr } from '../routines';
import { DecisionMaker } from './DecisionMaker';

export class UnknownMapDecisionMaker extends DecisionMaker {
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
