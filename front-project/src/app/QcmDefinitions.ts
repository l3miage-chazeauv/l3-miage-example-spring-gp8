export interface Miahoot{
  idMiahoot: number;
  listeQuestions: Question[];
}

export interface MiahootGame{
  isPresented: boolean;
  miahoot: Miahoot;
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

export interface MiahootUser{
  readonly miahootID ?: string;
  name: string
  readonly photoUrl : string
}

export interface Parties{
  readonly miahootID ?: number;
  readonly questions ?: Question[]
}
