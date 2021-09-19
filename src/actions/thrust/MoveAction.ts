import { ThrustAction, ThrustActionResult } from './ThrustAction';

export interface MoveActionParams {
  thrustValue: number;
}

export class MoveAction extends ThrustAction<MoveActionParams> {
  public readonly duration = 1;

  public execute(params: MoveActionParams): ThrustActionResult {
    return {
      id: 'MoveAction',
      thrustValue: params.thrustValue,
    };
  }

  public isAvaliable(): boolean {
    return true;
  }
}
