export class Vector {
  public static getAngleBetween(vectorA: Vector, vectorB: Vector): number {
    return Math.acos(
      (vectorA.x * vectorB.x + vectorA.y * vectorB.y) /
        (vectorA.getLength() * vectorB.getLength()),
    );
  }

  public static toDegrees(angleInRad: number): number {
    return Math.round(angleInRad * 180 / Math.PI);
  }

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getLength(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}
