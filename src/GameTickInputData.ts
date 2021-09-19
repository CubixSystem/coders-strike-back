import { Point } from './Point';

interface RawData {
  firstLine: string[];
  secondLine: string[];
}

export class GameTickInputData {
  public playerPodCoordinates = new Point(0, 0);
  public enemyPodCoordinates = new Point(0, 0);
  public nextCheckpointCoordinates = new Point(0, 0);
  public nextCheckpointDistance = 0;
  public nextCheckpointAngle = 0;
  public currentGameTick = 0;

  public onGameTick(rawData: RawData): void {
    this.currentGameTick++;

    this.playerPodCoordinates.x = parseInt(rawData.firstLine[0] || '0', 10);
    this.playerPodCoordinates.y = parseInt(rawData.firstLine[1] || '0', 10);

    this.enemyPodCoordinates.x = parseInt(rawData.secondLine[0] || '0', 10);
    this.enemyPodCoordinates.y = parseInt(rawData.secondLine[1] || '0', 10);

    this.nextCheckpointCoordinates.x = parseInt(
      rawData.firstLine[2] || '0',
      10,
    );
    this.nextCheckpointCoordinates.y = parseInt(
      rawData.firstLine[3] || '0',
      10,
    );

    this.nextCheckpointDistance = parseInt(rawData.firstLine[4] || '0', 10);
    this.nextCheckpointAngle = parseInt(rawData.firstLine[5] || '0', 10);
  }

  public isFirstGameTick() {
    return this.currentGameTick === 1;
  }
}
