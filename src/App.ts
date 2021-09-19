import {
  ExploredMapDecisionMaker,
  UnknownMapDecisionMaker,
} from './decision-makers';
import { GameTickInputData } from './GameTickInputData';
import { MapModel } from './models';
import { PlayerPodModel } from './models';

export class App {
  protected gameTickInputData = new GameTickInputData();
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

      this.gameTickInputData.onGameTick({
        firstLine: readline().split(' '),
        secondLine: readline().split(' '),
      });

      this.playerPodModel.onGameTick({
        inputData: this.gameTickInputData,
      });

      this.playerMapModel.onGameTick({
        inputData: this.gameTickInputData,
        podModel: this.playerPodModel,
      });

      {
        const data = {
          inputData: this.gameTickInputData,
          playerMapModel: this.playerMapModel,
          playerPodModel: this.playerPodModel,
        };

        this.unknownMapDecisionMaker.onGameTick(data);
        // this.playerMapModel.isMapExplored
        //   ? this.exploredMapDecisionMaker.onGameTick(data)
        //   : this.unknownMapDecisionMaker.onGameTick(data);
      }

      endTime = Date.now();
      tickTime = endTime - startTime;

      printErr('Tick time:', tickTime);
    }
  }
}
