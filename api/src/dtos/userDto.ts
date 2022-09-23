import {User} from "../models/userModel";

export class UserDto {
    id: number;
    email: string;
    isActivated: string;

    constructor(model: User) {
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}
