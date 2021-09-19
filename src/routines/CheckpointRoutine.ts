import { GameTick } from '../GameTick';
import { Routine, RoutineResult } from './Routine';
import { actionsRegistry as ar } from '../actions';

export class CheckpointRoutine extends Routine {
  public execute({ inputData }: GameTick): RoutineResult {
    const targetPointActionResult = ar.rotateToPointAction.execute({
      targetPoint: inputData.nextCheckpointCoordinates,
    });

    const thrustActionResult = ar.moveAction.execute({ thrustValue: 0 });

    return {
      id: 'CheckpointRoutine',
      targetPointActionResult,
      thrustActionResult,
    };
  }

  public isAvaliable({
    playerMapModel: { isCheckpointReached },
    playerPodModel: {
      currentTickData: { angleBetweenNextCheckpointAndMovementVector },
    },
  }: GameTick): boolean {
    return (
      isCheckpointReached && angleBetweenNextCheckpointAndMovementVector > 60
    );
  }
}
