import { GameTick } from '../GameTick';
import { Routine, RoutineResult } from '../routines';

export abstract class DecisionMaker {
  protected abstract highPriorityRoutines: Routine[];
  protected abstract normalPriorityRoutines: Routine[];
  protected abstract lowPriorityRoutines: Routine[];

  public abstract onGameTick(newTickData: GameTick): void;

  protected outputDecision({
    targetPointActionResult,
    thrustActionResult,
    id,
  }: RoutineResult): void {
    if (typeof thrustActionResult.thrustValue === 'number') {
      thrustActionResult.thrustValue = Math.round(
        thrustActionResult.thrustValue,
      );
    }

    printErr(
      'Routine:',
      `${id} = ${targetPointActionResult.id} + ${thrustActionResult.id}`,
    );
    printErr('thrustValue:', thrustActionResult.thrustValue);

    print(
      targetPointActionResult.targetPoint.x,
      targetPointActionResult.targetPoint.y,
      thrustActionResult.thrustValue,
    );
  }

  protected printCommonDebugInfo({
    playerMapModel,
    playerPodModel,
    inputData,
  }: GameTick): void {
    printErr('nextCheckpointAngle:', playerMapModel.nextCheckpointAngle);
    printErr('nextCheckpointDistance:', playerMapModel.nextCheckpointDistance);
    // printErr('angleBetweenSegments', playerMapModel.angleBetweenSegments);

    printErr('speed:', playerPodModel.currentTickData.speed);
    printErr('tangMomentum:', playerPodModel.currentTickData.tangMomentum);
    printErr(
      'angleBetweenNextCheckpointAndMovementVector:',
      playerPodModel.currentTickData
        .angleBetweenNextCheckpointAndMovementVector,
    );

    printErr('currentGameTick', inputData.currentGameTick);
  }
}
