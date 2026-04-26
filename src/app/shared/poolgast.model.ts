export interface Poolgast {
  id: number;
  name: string;
}

export function createPoolgast(id: number, name: string): Poolgast {
  return { id, name };
}