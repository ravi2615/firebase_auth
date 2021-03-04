export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
         photoURL?: string,
         displayName?: string,
         somethingCustom?: string,
         emailVerified?: boolean,
    ) {}

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }else {
            return this._token;
        }
    }
}