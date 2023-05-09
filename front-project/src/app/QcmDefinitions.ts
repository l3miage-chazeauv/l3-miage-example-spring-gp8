export interface Miahoot{
  idMiahoot: number;
  listeQuestions: Question[];
}

export interface InfosMiahoot{
    id: number;
    nom: string;
    description: string;
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
  id:number;
  label: string;
  reponses: Reponse[];
}

export interface MiahootUser{
  miahootID ?: string;
  name: string
  readonly photoUrl : string
}

export interface Parties{
  readonly miahootID ?: number;
  readonly questions ?: Question[]
}
