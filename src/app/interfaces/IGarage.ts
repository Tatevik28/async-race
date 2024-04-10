export interface Car {
  name: string;
  color: string;
  id?: number
}

export type CarStatus = "started" | "stopped"

export interface CarEngine {
  velocity: number,
  distance: number
}
