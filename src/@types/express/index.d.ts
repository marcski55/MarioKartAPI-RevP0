import { IKart } from "@entities/Kart";

declare module 'express' {
    export interface Request  {
        body: {
            name: string;
            type: string;
            speed: number;
            acceleration: number;
            weight: number;
            handling: number;
            miniTraction: number;
            traction: number;
        };
    }
}
