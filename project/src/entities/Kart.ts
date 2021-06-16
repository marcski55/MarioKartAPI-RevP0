export interface IKart {
    name: string;
    type: string;
    speed: number;
    acceleration: number;
    weight: number;
    handling: number;
    miniTraction: number;
    traction: number;
}

class Kart implements IKart {

    constructor(
        public name: string,
        public type: string,
        public speed: number,
        public acceleration: number,
        public weight: number,
        public handling: number,
        public miniTraction: number,
        public traction: number
    ) {}
}

export default Kart;