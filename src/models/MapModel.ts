import { GameTickInputData } from '../GameTickInputData';
import { Point } from '../Point';
import { Vector } from '../Vector';
import { PodModel } from './pods/PodModel';

interface TickData {
  podModel: PodModel;
  inputData: GameTickInputData;
}

interface MapDataParams {
  nextCheckpointCoordinates: Point;
}

class MapData {
  public nextCheckpointCoordinates: Point;

  constructor(params: MapDataParams) {
    this.nextCheckpointCoordinates = params.nextCheckpointCoordinates;
  }
}

export class MapModel {
  public isMapExplored = false;
  public isCheckpointReached = false;
  public checkpointsInLap = 0;
  public checkPoints: Point[] = [];

  public nextCheckpointCoordinates = new Point(0, 0);
  public nextCheckpointDistance = 0;
  public nextCheckpointAngle = 0;
  public podCoordinates = new Point(0, 0);
  public nextNextCheckpoint = new Point(0, 0);
  public angleBetweenSegments = 0;

  protected previousTickData = new MapData({
    nextCheckpointCoordinates: new Point(0, 0),
  });

  protected currentTickData = new MapData({
    nextCheckpointCoordinates: new Point(0, 0),
  });

  public onGameTick(newTickData: TickData): void {
    if (newTickData.inputData.isFirstGameTick()) {
      this.init(newTickData);
    }

    this.updatePreviousTickData();
    this.updateCurrentTickData(newTickData);
  }

  protected init({ podModel }: TickData) {
    const podCoordinates = podModel.currentTickData.coordinates;
    this.podCoordinates.x = podCoordinates.x;
    this.podCoordinates.y = podCoordinates.y;
  }

  protected updatePreviousTickData(): void {
    const { previousTickData: previousTickData } = this;

    previousTickData.nextCheckpointCoordinates.x =
      this.nextCheckpointCoordinates.x;
    previousTickData.nextCheckpointCoordinates.y =
      this.nextCheckpointCoordinates.y;
  }

  protected updateCurrentTickData({ inputData, podModel }: TickData): void {
    this.nextCheckpointCoordinates.x = inputData.nextCheckpointCoordinates.x;
    this.nextCheckpointCoordinates.y = inputData.nextCheckpointCoordinates.y;

    this.nextCheckpointDistance = inputData.nextCheckpointDistance;
    this.nextCheckpointAngle = inputData.nextCheckpointAngle;

    const podCoordinates = podModel.currentTickData.coordinates;
    this.podCoordinates.x = podCoordinates.x;
    this.podCoordinates.y = podCoordinates.y;

    this.isCheckpointReached = this.isReachCheckpointInCurrentTick();

    if (this.isCheckpointReached) {
      this.onCheckpointReached();
    }

    if (this.isMapExplored) {
      this.angleBetweenSegments = this.getAngleBetweenPathSegments();
    }

    if (inputData.isFirstGameTick()) {
      this.checkPoints.push(this.nextCheckpointCoordinates);
      return;
    }
  }

  protected onCheckpointReached(): void {
    if (this.isMapExplored) {
      this.updateNextNextCheckpoint();
      return;
    }

    const isCheckpointKnown = this.checkPoints.findIndex((point) => {
      return Point.isEqual(point, this.nextCheckpointCoordinates);
    });

    if (isCheckpointKnown === -1) {
      this.checkPoints.push(this.nextCheckpointCoordinates);
    } else {
      this.onMapExplored();
    }
  }

  protected onMapExplored(): void {
    this.isMapExplored = true;
    this.checkpointsInLap = this.checkPoints.length;
    this.updateNextNextCheckpoint();
  }

  protected updateNextNextCheckpoint(): void {
    const targetCheckpointIndex = this.checkPoints.findIndex((point) => {
      return Point.isEqual(point, this.nextCheckpointCoordinates);
    });

    this.nextNextCheckpoint =
      targetCheckpointIndex === this.checkPoints.length - 1
        ? this.checkPoints[0]!
        : this.checkPoints[targetCheckpointIndex + 1]!;
  }

  protected isReachCheckpointInCurrentTick(): boolean {
    return !Point.isEqual(
      this.nextCheckpointCoordinates,
      this.previousTickData.nextCheckpointCoordinates,
    );
  }

  protected getAngleBetweenPathSegments(): number {
    const vectorToPod = new Vector(
      this.nextCheckpointCoordinates.x - this.podCoordinates.x,
      this.nextCheckpointCoordinates.y - this.podCoordinates.y,
    );

    const vectorToNextNextCheckpoint = new Vector(
      this.nextCheckpointCoordinates.x - this.nextNextCheckpoint.x,
      this.nextCheckpointCoordinates.y - this.nextNextCheckpoint.y,
    );

    const angleInRad = Vector.getAngleBetween(
      vectorToPod,
      vectorToNextNextCheckpoint,
    );

    return Vector.toDegrees(angleInRad);
  }
}
