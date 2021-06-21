/** Wheel class implementing Wheel Interface and providing constructor */
export class Part {
    constructor(name, type, speed, acceleration, weight, handling, traction, miniTraction) {
        this.name = name;
        this.type = type;
        this.speed = speed;
        this.acceleration = acceleration;
        this.weight = weight;
        this.handling = handling;
        this.traction = traction;
        this.miniTraction = miniTraction;
    }
}
