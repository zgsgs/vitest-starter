declare module ApiUser {
  interface Posts {
    userId: number,
    id: number,
    title: string,
    body: string,
  }

  interface Comments {
    userId: number,
    id: number,
    content: string,
  }
}
