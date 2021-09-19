import { GameTickInputData } from '../../GameTickInputData';
import { Point } from '../../Point';
import { Vector } from '../../Vector';

interface TickData {
  inputData: GameTickInputData;
}

class PodData {
  public coordinates = new Point(0, 0);
  public speed = 0;
  public movementVector = new Vector(0, 0);
  public tangMomentum = 0;
  public angleBetweenNextCheckpointAndMovementVector = 0;
  public readonly collisionRadius = 400;
}

abstract class PodModel {
  public previousTickData = new PodData();
  public currentTickData = new PodData();

  public onGameTick(newTickData: TickData): void {
    if (newTickData.inputData.isFirstGameTick()) {
      this.init(newTickData);
      return;
    }

    this.updatePreviousTickData();
    this.updateCurrentTickData(newTickData);
  }

  protected init(newTickData: TickData) {
    const coordinates = this.getCoordinates(newTickData);

    this.currentTickData.coordinates.x = coordinates.x;
    this.currentTickData.coordinates.y = coordinates.y;

    this.previousTickData.coordinates.x = coordinates.x;
    this.previousTickData.coordinates.y = coordinates.y;
  }

  protected updatePreviousTickData(): void {
    const { previousTickData, currentTickData } = this;

    previousTickData.coordinates.x = currentTickData.coordinates.x;
    previousTickData.coordinates.y = currentTickData.coordinates.y;

    previousTickData.speed = currentTickData.speed;

    previousTickData.movementVector.x = currentTickData.movementVector.x;
    previousTickData.movementVector.y = currentTickData.movementVector.y;

    previousTickData.tangMomentum = currentTickData.tangMomentum;
  }

  protected abstract getCoordinates(newTickData: TickData): Point;

  protected updateCurrentTickData(newTickData: TickData): void {
    const { previousTickData, currentTickData } = this;
    const coordinates = this.getCoordinates(newTickData);

    currentTickData.coordinates.x = coordinates.x;
    currentTickData.coordinates.y = coordinates.y;

    currentTickData.movementVector.x =
      currentTickData.coordinates.x - previousTickData.coordinates.x;

    currentTickData.movementVector.y =
      currentTickData.coordinates.y - previousTickData.coordinates.y;

    currentTickData.speed = Point.getDistance(
      currentTickData.coordinates,
      previousTickData.coordinates,
    );

    currentTickData.tangMomentum =
      currentTickData.speed - previousTickData.speed;

    currentTickData.angleBetweenNextCheckpointAndMovementVector =
      this.calculateAngleBetweenNextCheckpointAndMovementVector(newTickData);
  }

  protected calculateAngleBetweenNextCheckpointAndMovementVector({
    inputData,
  }: TickData): number {
    const targetVector = new Vector(
      inputData.nextCheckpointCoordinates.x -
        this.currentTickData.coordinates.x,
      inputData.nextCheckpointCoordinates.y -
        this.currentTickData.coordinates.y,
    );

    const angleInRad = Vector.getAngleBetween(
      this.currentTickData.movementVector,
      targetVector,
    );

    return Vector.toDegrees(angleInRad);
  }
}

export { PodModel, TickData };
