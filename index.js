class HashMap{
    constructor(){
        this.root = [];
    }
    hash(value){
        let hashCode = 0;
        let primeNumber = 97;
        for(let i = 0; i<value.length; i++){
            hashCode = (hashCode * primeNumber) + value.charCodeAt(i);
        }
        console.log(hashCode);
    }
}

let hashmap = new HashMap();
hashmap.hash('Haris');