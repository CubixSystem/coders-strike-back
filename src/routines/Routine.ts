import { TargetPointActionResult, ThrustActionResult } from '../actions';
import { GameTick } from '../GameTick';

export enum RoutinePriority {
  HIGH,
  NORMAL,
  LOW,
}

export interface RoutineResult {
  id: string;
  targetPointActionResult: TargetPointActionResult;
  thrustActionResult: ThrustActionResult;
}

export abstract class Routine {
  public abstract execute(gameTick: GameTick): RoutineResult;
  public abstract isAvaliable(gameTick: GameTick): boolean;
}
