import { ThrustAction, ThrustActionResult } from './ThrustAction';

export class BoostAction extends ThrustAction<{}> {
  public readonly duration = 1;

  protected boostCount: number;

  constructor({ boostCount }: { boostCount: number }) {
    super();
    this.boostCount = boostCount;
  }

  public execute(): ThrustActionResult {
    this.boostCount--;

    return {
      id: 'BoostAction',
      thrustValue: 'BOOST',
    };
  }

  public isAvaliable(): boolean {
    return this.boostCount > 0;
  }
}
