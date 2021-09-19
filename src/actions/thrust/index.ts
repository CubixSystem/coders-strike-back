import { BoostAction } from './BoostAction';
import { MoveAction } from './MoveAction';
import { ShieldAction } from './ShieldAction';

export type ThrustActions = BoostAction | MoveAction | ShieldAction;

export * from './BoostAction';
export * from './MoveAction';
export * from './ShieldAction';
export * from './ThrustAction';
