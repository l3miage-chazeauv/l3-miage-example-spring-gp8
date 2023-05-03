export interface miahootGame {
  isPresented: boolean;
  idMiahoot: number;
  listeQuestions: Question[];
}
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
