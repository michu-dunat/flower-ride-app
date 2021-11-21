export class User {
  id: number | undefined;
  login: string;
  password: string;
  role: string;

  constructor(login: string, password: string, role: string) {
    this.login = login;
    this.password = password;
    this.role = role;
  }
}
