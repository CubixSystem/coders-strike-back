export class Point {
  public static getDistance(pointA: Point, pointB: Point): number {
    return Math.round(
      Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2),
    );
  }

  public static isEqual(pointA: Point, pointB: Point): boolean {
    return pointA.x === pointB.x && pointA.y === pointB.y;
  }

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
