import { GameTick } from '../GameTick';
import { Point } from '../Point';
import { Routine, RoutineResult } from '../routines';

export abstract class DecisionMaker {
  protected thrustValue: number | 'BOOST' | 'SHIELD' = 100;
  protected targetPoint?: Point;
  protected abstract highPriorityRoutines: Set<Routine>;
  protected abstract normalPriorityRoutines: Set<Routine>;
  protected abstract lowPriorityRoutines: Set<Routine>;
  protected isShieldAvaliable = true;

  public abstract onGameTick(newTickData: GameTick): void;

  protected outputDecision({
    targetPoint,
    thrustValue,
    id,
  }: RoutineResult): void {
    if (targetPoint === undefined) {
      throw new Error('targetPoint not defined');
    }

    if (typeof thrustValue === 'number') {
      thrustValue = Math.round(thrustValue);
    }

    printErr('Routine:', id);
    printErr('thrustValue:', thrustValue);
    print(targetPoint.x, targetPoint.y, this.thrustValue);
  }

  protected printCommonDebugInfo({
    playerMapModel,
    playerPodModel,
  }: GameTick): void {
    printErr(
      'angleBetweenNextCheckpointAndMovementVector:',
      playerMapModel.angleBetweenNextCheckpointAndMovementVector,
    );
    printErr('angleToNextCheckpoint:', playerMapModel.angleToNextCheckpoint);
    printErr('distToNextCheckpoint:', playerMapModel.distToNextCheckpoint);
    printErr('speed:', playerPodModel.speed);
    printErr('tangMomentum:', playerPodModel.tangMomentum);
    printErr();
    printErr('angleBetweenSegments', playerMapModel.angleBetweenSegments);
  }
}
