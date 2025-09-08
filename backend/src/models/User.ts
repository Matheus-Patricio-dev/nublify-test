
// Model de User com id, nome, email e senha

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string // A senha será armazenada de forma criptografada no banco de dados
  ) {}
}