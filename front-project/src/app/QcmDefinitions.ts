export interface Reponse{
  id:number;
  label: string;
  estValide: boolean;
  estCorrecte: boolean;
}

export interface Question{
  id:number;
  label: string;
  reponses: Reponse[];
}
