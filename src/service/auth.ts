interface AuthI<T> {
  auth?(): Promise<T>;
  createAuth?(): Promise<T>;
}

export class AuthCtrl<T> implements AuthI<T> {
  async auth(): Promise<T> {
    return "Hai" as unknown as T;
  }
}

export const authService = new AuthCtrl();
