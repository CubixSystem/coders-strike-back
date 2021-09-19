import { Point } from '../../Point';
import {
  TargetPointAction,
  TargetPointActionResult,
} from './TargetPointAction';

export interface RotateToPointActionParams {
  targetPoint: Point;
}

export class RotateToPointAction extends TargetPointAction<RotateToPointActionParams> {
  public readonly duration = 1;

  public execute(params: RotateToPointActionParams): TargetPointActionResult {
    return {
      id: 'RotateToPointAction',
      targetPoint: params.targetPoint,
    };
  }

  public isAvaliable(): boolean {
    return true;
  }
}
