

export class Usuario {
    
    static fromFireBase( { uid, nombre, email} : {uid:string, nombre: string, email: string} ) {
        return new Usuario(uid, nombre, email);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){}

}
