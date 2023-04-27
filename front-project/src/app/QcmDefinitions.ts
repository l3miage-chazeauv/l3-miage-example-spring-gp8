export interface Reponse{
  reponseId:number;
  label: string;
  estCochee: boolean;
  estCorrecte: boolean;
}

export interface Question{
  questionId:number;
  label: string;
  reponses: Reponse[];
}
