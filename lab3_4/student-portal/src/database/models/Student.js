export default class Student {
    constructor(id, name, lastName, email, hashedPassword) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.photoUrl = null;
    }
}
