import { GameTick } from '../GameTick';
import { Point } from '../Point';

interface RoutineResult {
  thrustValue: number | 'BOOST' | 'SHIELD';
  targetPoint: Point;
  id: string;
}

enum RoutinePriority {
  HIGH,
  NORMAL,
  LOW,
}

abstract class Routine {
  public abstract readonly duration: number;
  public abstract readonly priority: RoutinePriority;

  public abstract execute(gameTick: GameTick): RoutineResult;
  public abstract isAvaliable(gameTick: GameTick): boolean;
}

export { Routine, RoutineResult, RoutinePriority };
