export class User {
  uid;
  displayName;
  email;
  photoURL;

  constructor({
    uid = "1",
    displayName = "Name",
    email = "default@email.com",
    photoURL = "",
  }) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
  }
}
