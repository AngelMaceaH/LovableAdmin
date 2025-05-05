export interface ApiProgram {
  id: string;
  subModule: number;
  module: number;
  description: string;
}
export interface ApiSubModule {
  subModule: number;
  description: string;
  programs: ApiProgram[];
}
export interface ApiMenuItem {
  module: number;
  description: string;
  abreviation: string;
  subModules: ApiSubModule[];
}
