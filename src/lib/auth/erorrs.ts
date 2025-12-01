
export class InvalidCredentialsError extends Error {
  constructor(message = "Invalid email or password.") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

export class ExistingUserError extends Error {
  constructor(message = "This user already exists.") {
    super(message);
    this.name = "ExistingUserError";
  }
}

export class SessionDoesNotExistError extends Error{
  constructor(message = "Session does not exist.") {
    super(message);
    this.name = "SessionDoesNotExistError";
  }
}
