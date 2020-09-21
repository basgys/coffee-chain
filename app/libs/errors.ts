export class NotFoundError implements Error {
  name: string
  message: string

  constructor(message: string) {
    this.name = "Not found"
    this.message = message
  }
}