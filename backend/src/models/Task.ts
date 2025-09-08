// Model de Task com id, titulo, descricao, status e referencia ao usuário dono
export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status: string,
    public userId: number
  ) {}
}