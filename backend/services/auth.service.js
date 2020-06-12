import jsonwebtoken from 'jsonwebtoken'
import { UserRepository } from "../repositories/UserRepository";

export class Auth {

    signIn({ username, password }) {



        return "jwt";
    }

    isSignedIn(jwt) {

        return true;
    }

}