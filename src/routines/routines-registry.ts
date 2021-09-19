import { BoostRoutine } from './BoostRoutine';
import { CheckpointRoutine } from './CheckpointRoutine';
import { MoveRoutine } from './MoveRoutine';
import { RotateToCheckpointRoutine } from './RotateToCheckpointRoutine';

export const routinesRegistry = {
  boostRoutine: new BoostRoutine(),
  checkpointRoutine: new CheckpointRoutine(),
  moveRoutine: new MoveRoutine(),
  rotateToCheckpointRoutine: new RotateToCheckpointRoutine(),
};
