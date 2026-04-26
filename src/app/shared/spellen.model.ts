export interface Spellen {
  id: number;
  nameBreak: string;
  tegen: string;
}

export function createSpellen(id: number, nameBreak: string, tegen: string): Spellen {
  return { id, nameBreak, tegen };
}