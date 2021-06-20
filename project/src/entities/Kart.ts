/** Kart Interface defines types needed in any Kart object. */
export interface IKart {
  name: string;
  type: string;
  speed: number;
  acceleration: number;
  weight: number;
  handling: number;
  traction: number;
  miniTraction: number;
}

/** Kart class implementing Kart Interface and providing constructor */
export class Kart implements IKart {
  constructor(
    public name: string,
    public type: string,
    public speed: number,
    public acceleration: number,
    public weight: number,
    public handling: number,
    public traction: number,
    public miniTraction: number
  ) {}
}