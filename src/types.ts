export interface Card {
  id: number;
  pairValue: number;
  nome: string;
  fundo: string;
  nivel: number;
  imagem: string;
  alt: string;
  descricao: string;
  atk: number;
  def: number;
  isFlipped: boolean;
  isMatched: boolean;
}
