import { GameTick } from '../GameTick';
import { Routine, RoutineResult } from './Routine';
import { actionsRegistry as ar } from '../actions';

export class BoostRoutine extends Routine {
  public execute({ inputData }: GameTick): RoutineResult {
    const targetPointActionResult = ar.rotateToPointAction.execute({
      targetPoint: inputData.nextCheckpointCoordinates,
    });

    const thrustActionResult = ar.boostAction.execute();

    return {
      id: 'BoostRoutine',
      targetPointActionResult,
      thrustActionResult,
    };
  }

  public isAvaliable({ inputData }: GameTick): boolean {
    return (
      ar.boostAction.isAvaliable() && inputData.nextCheckpointDistance > 3000
    );
  }
}
