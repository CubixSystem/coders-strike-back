export interface ActionResult {
  id: string;
}

export abstract class Action<ActionParams> {
  public abstract readonly duration: number;

  public abstract execute(params: ActionParams): ActionResult;
  public abstract isAvaliable(): boolean;
}
