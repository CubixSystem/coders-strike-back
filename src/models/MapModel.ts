import { FrameData } from '../FrameData';
import { Point } from '../Point';
import { Vector } from '../Vector';
import { PodModel } from './podModels/PodModel';

interface TickData {
  podModel: PodModel;
  frameData: FrameData;
}

interface LastTickDataParams {
  nextCheckpoint: Point;
}

class LastTickData {
  public nextCheckpoint: Point;

  constructor(params: LastTickDataParams) {
    this.nextCheckpoint = params.nextCheckpoint;
  }
}

export class MapModel {
  public isExplored: boolean = false;
  public isPassCheckpoint: boolean = false;
  public checkpointsInLap: number = 0;
  public checkPoints: Point[] = [];

  public nextCheckpoint?: Point;
  public distToNextCheckpoint?: number;
  public angleToNextCheckpoint?: number;
  public podCoordinates?: Point;
  public nextNextCheckpoint?: Point;
  public angleBetweenNextCheckpointAndMovementVector?: number;
  public angleBetweenSegments?: number;

  protected lastTickData?: LastTickData;

  public onGameTick(newTickData: TickData): void {
    const isFirstGameTick = newTickData.frameData.isFirstGameTick;

    this.updateLastTickData(isFirstGameTick);
    this.updateCurrentTickData(newTickData);
  }

  protected updateLastTickData(isFirstGameTick: boolean): void {
    if (isFirstGameTick) {
      return;
    }

    if (this.nextCheckpoint === undefined) {
      throw new Error('nextCheckpoint not defined');
    }

    if (!this.lastTickData) {
      this.lastTickData = new LastTickData({
        nextCheckpoint: this.nextCheckpoint,
      });
      return;
    }

    this.lastTickData.nextCheckpoint = this.nextCheckpoint;
  }

  protected updateCurrentTickData({ frameData, podModel }: TickData): void {
    this.nextCheckpoint = frameData.nextCheckpoint;
    this.distToNextCheckpoint = frameData.distToNextCheckpoint;
    this.angleToNextCheckpoint = frameData.angleToNextCheckpoint;
    this.podCoordinates = podModel.coordinates;

    if (frameData.isFirstGameTick) {
      return;
    }

    this.isPassCheckpoint = this.checkCheckpointPass();
    this.angleBetweenNextCheckpointAndMovementVector = this.getAngleBetweenNextCheckpointAndMovementVector(
      podModel,
    );

    if (this.isPassCheckpoint) {
      this.onPassCheckpoint();
    }

    if (this.isExplored) {
      this.angleBetweenSegments = this.getAngleBetweenPathSegments();
    }

    if (frameData.isFirstGameTick) {
      this.checkPoints.push(this.nextCheckpoint);
      return;
    }
  }

  protected onPassCheckpoint(): void {
    if (this.isExplored) {
      this.updateNextNextCheckpoint();
    } else {
      if (this.nextCheckpoint === undefined) {
        throw new Error('nextCheckpoint not defined');
      }

      const isExist = this.checkPoints.findIndex(point => {
        if (this.nextCheckpoint === undefined) {
          throw new Error('nextCheckpoint not defined');
        }
        return Point.isEqual(point, this.nextCheckpoint);
      });

      if (isExist === -1) {
        this.checkPoints.push(this.nextCheckpoint);
      } else {
        this.onExplored();
      }
    }
  }

  protected onExplored(): void {
    this.isExplored = true;
    this.checkpointsInLap = this.checkPoints.length;
    this.updateNextNextCheckpoint();
  }

  protected updateNextNextCheckpoint(): void {
    const targetCheckpointIndex = this.checkPoints.findIndex(point => {
      if (this.nextCheckpoint === undefined) {
        throw new Error('nextCheckpoint not defined');
      }
      return Point.isEqual(point, this.nextCheckpoint);
    });

    this.nextNextCheckpoint =
      targetCheckpointIndex === this.checkPoints.length - 1
        ? this.checkPoints[0]
        : this.checkPoints[targetCheckpointIndex + 1];
  }

  protected checkCheckpointPass(): boolean {
    if (this.nextCheckpoint === undefined) {
      throw new Error('nextCheckpoint not defined');
    }

    if (this.lastTickData === undefined) {
      throw new Error('lastTickData not defined');
    }

    return !Point.isEqual(
      this.nextCheckpoint,
      this.lastTickData.nextCheckpoint,
    );
  }

  protected getAngleBetweenNextCheckpointAndMovementVector(
    podModel: PodModel,
  ): number {
    if (this.nextCheckpoint === undefined) {
      throw new Error('nextCheckpoint not defined');
    }

    if (this.podCoordinates === undefined) {
      throw new Error('podCoordinates not defined');
    }

    const targetVector = new Vector(
      this.nextCheckpoint.x - this.podCoordinates.x,
      this.nextCheckpoint.y - this.podCoordinates.y,
    );
    const angleInRad = Vector.getAngleBetween(
      podModel.movementVector,
      targetVector,
    );
    return Vector.toDegrees(angleInRad);
  }

  protected getAngleBetweenPathSegments(): number {
    if (this.nextCheckpoint === undefined) {
      throw new Error('nextCheckpoint not defined');
    }

    if (this.podCoordinates === undefined) {
      throw new Error('podCoordinates not defined');
    }

    if (this.nextNextCheckpoint === undefined) {
      throw new Error('nextNextCheckpoint not defined');
    }

    const vectorToPod = new Vector(
      this.nextCheckpoint.x - this.podCoordinates.x,
      this.nextCheckpoint.y - this.podCoordinates.y,
    );
    const vectorToNextNextCheckpoint = new Vector(
      this.nextCheckpoint.x - this.nextNextCheckpoint.x,
      this.nextCheckpoint.y - this.nextNextCheckpoint.y,
    );
    const angleInRad = Vector.getAngleBetween(
      vectorToPod,
      vectorToNextNextCheckpoint,
    );
    return Vector.toDegrees(angleInRad);
  }
}
