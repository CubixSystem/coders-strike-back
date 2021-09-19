import { GameTick } from '../GameTick';
import { Routine, RoutineResult } from './Routine';
import { actionsRegistry as ar } from '../actions';

export class RotateToCheckpointRoutine extends Routine {
  public execute({
    inputData,
    playerMapModel: { nextCheckpointAngle: angleToNextCheckpoint },
  }: GameTick): RoutineResult {
    const targetPointActionResult = ar.rotateToPointAction.execute({
      targetPoint: inputData.nextCheckpointCoordinates,
    });

    const thrustActionResult = ar.moveAction.execute({
      thrustValue: (100 * 80) / Math.abs(angleToNextCheckpoint),
    });

    return {
      id: 'RotateToCheckpointRoutine',
      targetPointActionResult,
      thrustActionResult,
    };
  }

  public isAvaliable({
    playerMapModel: { nextCheckpointAngle: angleToNextCheckpoint },
  }: GameTick): boolean {
    return Math.abs(angleToNextCheckpoint) > 80;
  }
}
