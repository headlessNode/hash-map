class HashMap{
    constructor(initialCapacity, loadFactor){
        this.buckets = new Array(initialCapacity);
        this.loadFactor = loadFactor;
        this.capacity = this.buckets.length;
    }
    hash(value){
        let hashCode = 0;
        let primeNumber = 97;
        for(let i = 0; i<value.length; i++){
            hashCode = (hashCode * primeNumber) + value.charCodeAt(i);
        }
        return hashCode % 16;
    }
    set(keyValue){
        const keyIndex = this.hash(keyValue);
        if (keyIndex < 0 || keyIndex >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }
        if(keyIndex > this.capacity * this.loadFactor){
            this.capacity = this.capacity * 2;
            this.set(keyValue);
        }else{
            this.buckets[keyIndex] = keyValue;
        }
    }
    get(key){
        if(this.buckets[key]){
            return this.buckets[key];
        }else{
            return null;
        }
    }
    has(key){
        let exists = false;
        this.buckets.forEach((value,index)=>{
            if(index === key){
                return true;
            }
        });
        return exists;
    }
}

let hashmap = new HashMap(16,0.75);
hashmap.set('Odin');
hashmap.set('Thor');
hashmap.set('Freya');
hashmap.set('Loki');
hashmap.set('Frigg');
hashmap.set('Balder');
hashmap.set('Heimdall');
hashmap.set('Fenrir');


console.log(hashmap);
console.log(hashmap.buckets.length);
console.log(hashmap.get(20));
console.log(hashmap.has(7));