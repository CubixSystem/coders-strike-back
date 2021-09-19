import { TargetPointActions } from './target-point';
import { ThrustActions } from './thrust';

export type Actions = TargetPointActions | ThrustActions;

export * from './Action';
export * from './target-point';
export * from './thrust';
export * from './actions-registry';
