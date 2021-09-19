import { GameTick } from '../GameTick';
import { Routine, RoutineResult } from './Routine';
import { actionsRegistry as ar } from '../actions';

export class MoveRoutine extends Routine {
  public execute({ inputData }: GameTick): RoutineResult {
    const targetPointActionResult = ar.rotateToPointAction.execute({
      targetPoint: inputData.nextCheckpointCoordinates,
    });

    const thrustActionResult = ar.moveAction.execute({ thrustValue: 100 });

    return {
      id: 'MoveRoutine',
      targetPointActionResult,
      thrustActionResult,
    };
  }

  public isAvaliable(): boolean {
    return true;
  }
}
