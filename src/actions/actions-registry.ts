import { RotateToPointAction } from './target-point';
import { BoostAction, MoveAction, ShieldAction } from './thrust';

export const actionsRegistry = {
  rotateToPointAction: new RotateToPointAction(),
  boostAction: new BoostAction({ boostCount: 1 }),
  moveAction: new MoveAction(),
  shieldAction: new ShieldAction(),
};
