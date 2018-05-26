import { FrameData } from '../../FrameData';
import { Point } from '../../Point';
import { Vector } from '../../Vector';

interface TickData {
  frameData: FrameData;
}

interface LastTickDataParams {
  coordinates: Point;
  speed: number;
  movementVector: Vector;
}

class LastTickData {
  public coordinates: Point;
  public speed: number;
  public movementVector: Vector;

  constructor(params: LastTickDataParams) {
    this.coordinates = params.coordinates;
    this.speed = params.speed;
    this.movementVector = params.movementVector;
  }
}

abstract class PodModel {
  public speed: number = 0;
  public movementVector: Vector = new Vector(0, 0);
  public tangMomentum: number = 0;
  // public normMomentum: number = 0;
  public coordinates?: Point;

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

    if (this.coordinates === undefined) {
      throw new Error('coordinates not defined');
    }

    if (!this.lastTickData) {
      this.lastTickData = new LastTickData({
        coordinates: new Vector(this.coordinates.x, this.coordinates.y),
        movementVector: new Vector(
          this.movementVector.x,
          this.movementVector.y,
        ),
        speed: this.speed,
      });
      return;
    }

    this.lastTickData.coordinates = new Vector(
      this.coordinates.x,
      this.coordinates.y,
    );
    this.lastTickData.speed = this.speed;
    this.lastTickData.movementVector = this.movementVector;
  }

  protected abstract getCoordinates(newTickData: TickData): Point;

  protected updateCurrentTickData(newTickData: TickData): void {
    this.coordinates = this.getCoordinates(newTickData);

    if (newTickData.frameData.isFirstGameTick) {
      return;
    }

    if (this.lastTickData === undefined) {
      throw new Error('lastTickData not defined');
    }

    this.speed = Point.getDistance(
      this.coordinates,
      this.lastTickData.coordinates,
    );

    this.movementVector = new Vector(
      this.coordinates.x - this.lastTickData.coordinates.x,
      this.coordinates.y - this.lastTickData.coordinates.y,
    );

    this.tangMomentum = this.speed - this.lastTickData.speed;
  }
}

export { PodModel, TickData };
