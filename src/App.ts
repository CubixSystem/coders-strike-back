import {
  ExploredMapDecisionMaker,
  UnknownMapDecisionMaker,
} from './decisionMakers';
import { FrameData } from './FrameData';
import { MapModel } from './models';
import { PlayerPodModel } from './models';

export class App {
  protected frameData?: FrameData;
  protected playerPodModel = new PlayerPodModel();
  protected playerMapModel = new MapModel();
  protected unknownMapDecisionMaker = new UnknownMapDecisionMaker();
  protected exploredMapDecisionMaker = new ExploredMapDecisionMaker();

  public init(): void {
    let startTime: number;
    let endTime: number;
    let tickTime: number;

    while (true) {
      startTime = Date.now();

      {
        const data = {
          firstLine: readline().split(' '),
          secondLine: readline().split(' '),
        };
        this.frameData
          ? this.frameData.onGameTick(data)
          : (this.frameData = new FrameData(data));
      }

      this.playerPodModel.onGameTick({ frameData: this.frameData });

      this.playerMapModel.onGameTick({
        frameData: this.frameData,
        podModel: this.playerPodModel,
      });

      {
        const data = {
          frameData: this.frameData,
          playerMapModel: this.playerMapModel,
          playerPodModel: this.playerPodModel,
        };
        this.playerMapModel.isExplored
          ? this.exploredMapDecisionMaker.onGameTick(data)
          : this.unknownMapDecisionMaker.onGameTick(data);
      }

      endTime = Date.now();
      tickTime = endTime - startTime;
      printErr('Tick time:', tickTime);
    }
  }
}
