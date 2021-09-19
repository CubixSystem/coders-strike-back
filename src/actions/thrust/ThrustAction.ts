import { Action } from '../Action';

export interface ThrustActionResult {
  id: string;
  thrustValue: number | 'BOOST' | 'SHIELD';
}

export abstract class ThrustAction<ActionParams> extends Action<ActionParams> {
  public abstract execute(params: ActionParams): ThrustActionResult;
}
