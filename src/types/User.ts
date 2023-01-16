export interface Root {
  login: Login[];
}

export interface Login {
  ok: boolean;
  data: Data;
}

export interface Data {
  id: string;
  name: string;
  tasks: Recado;
  token: string;
  pass: string;
  Rpass: string;
  userName: string;
  userId: string;
}

export interface Recado {
  id: any;
  description?: string;
  detail?: string;
}
