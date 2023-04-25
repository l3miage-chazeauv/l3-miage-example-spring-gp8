export interface Reponse{
  label: string;
  estValide: boolean;
}

export interface Question{
  label: string;
  reponses: Reponse[];
}
