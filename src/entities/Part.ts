/** Wheel Interface defines types needed in any Wheel object. */
export interface IPart {
  name: string;
  type: string;
  speed: number;
  acceleration: number;
  weight: number;
  handling: number;
  traction: number;
  miniTraction: number;
}

/** Wheel class implementing Wheel Interface and providing constructor */
export class Part implements IPart {
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