import {User} from "./user";

export class UserDto {
    id: number;
    email: string;
    isActivated: boolean;

    constructor(model: User) {
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}
