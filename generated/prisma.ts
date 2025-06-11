export class PrismaClient {
  constructor() {}

  $connect() {
    return Promise.resolve()
  }

  $disconnect() {
    return Promise.resolve()
  }

  utilisateur = {
    findUnique: (args: any) => Promise.resolve(null),
    create: (args: any) => Promise.resolve(null),
  }
}
