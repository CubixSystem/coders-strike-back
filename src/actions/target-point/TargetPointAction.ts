import { Point } from '../../Point';
import { Action } from '../Action';

export interface TargetPointActionResult {
  id: string;
  targetPoint: Point;
}

export abstract class TargetPointAction<
  ActionParams,
> extends Action<ActionParams> {
  public abstract execute(params: ActionParams): TargetPointActionResult;
}
