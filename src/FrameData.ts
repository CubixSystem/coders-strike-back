import { Point } from './Point';

interface RawData {
  firstLine: string[];
  secondLine: string[];
}

export class FrameData {
  public playerPod: Point;
  public enemyPod: Point;
  public nextCheckpoint: Point;
  public distToNextCheckpoint: number;
  public angleToNextCheckpoint: number;
  public isFirstGameTick: boolean;

  constructor(rawData: RawData) {
    this.isFirstGameTick = true;
    this.playerPod = new Point(
      parseInt(rawData.firstLine[0], 10),
      parseInt(rawData.firstLine[1], 10),
    );
    this.enemyPod = new Point(
      parseInt(rawData.secondLine[0], 10),
      parseInt(rawData.secondLine[1], 10),
    );
    this.nextCheckpoint = new Point(
      parseInt(rawData.firstLine[2], 10),
      parseInt(rawData.firstLine[3], 10),
    );
    this.distToNextCheckpoint = parseInt(rawData.firstLine[4], 10);
    this.angleToNextCheckpoint = parseInt(rawData.firstLine[5], 10);
  }

  public onGameTick(rawData: RawData): void {
    if (this.isFirstGameTick) {
      this.isFirstGameTick = false;
    }

    this.playerPod = new Point(
      parseInt(rawData.firstLine[0], 10),
      parseInt(rawData.firstLine[1], 10),
    );
    this.enemyPod = new Point(
      parseInt(rawData.secondLine[0], 10),
      parseInt(rawData.secondLine[1], 10),
    );
    this.nextCheckpoint = new Point(
      parseInt(rawData.firstLine[2], 10),
      parseInt(rawData.firstLine[3], 10),
    );
    this.distToNextCheckpoint = parseInt(rawData.firstLine[4], 10);
    this.angleToNextCheckpoint = parseInt(rawData.firstLine[5], 10);
  }
}
