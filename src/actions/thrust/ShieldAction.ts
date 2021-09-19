import { ThrustAction, ThrustActionResult } from './ThrustAction';

export class ShieldAction extends ThrustAction<{}> {
  public readonly duration = 3;

  public execute(): ThrustActionResult {
    return {
      id: 'ShieldAction',
      thrustValue: 'SHIELD',
    };
  }

  public isAvaliable(): boolean {
    return true;
  }
}
