import { LinkedList } from "./linkedList.js";

class HashMap{
    constructor(initialCapacity, loadFactor){
        this.buckets = new Array(initialCapacity).fill(null);
        this.loadFactor = loadFactor;
        this.capacity = this.buckets.length;
    }
    hash(value){
        let hashCode = 0;
        let primeNumber = 97;
        for(let i = 0; i<value.length; i++){
            hashCode = (hashCode * primeNumber) + value.charCodeAt(i);
        }
        return hashCode % this.capacity;
    }
    set(key, keyValue){
        const keyIndex = this.hash(key);
        if (keyIndex < 0 || keyIndex >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }
        let count = 0
        this.buckets.forEach((value)=>{if(value != null){count++;}});
        if(count + 1 > this.capacity * this.loadFactor){
            this.capacity = this.capacity * 2;
            this.set(key, keyValue);
        }else{
            if(this.buckets[keyIndex] === null){
                this.buckets[keyIndex] = new LinkedList(keyValue, key);
            }else{
                this.buckets[keyIndex].append(keyValue, key);
            }
            
        }
    }
    get(key){
        for(let i = 0; i<this.buckets.length; i++){
            let element = this.buckets[i];
            if(element){
                if(!element.head.nextNode && element.head.key === key){
                    return element.head.value;
                }
                if(element.head.nextNode){
                    let tmp = element.head;
                    while(tmp != null){
                        if(tmp.key === key){
                            return tmp.value;
                        }
                        tmp = tmp.nextNode;
                    }
                }
            }
        }
    }
    has(key){
        let exists = false;
        for(let i = 0; i<this.buckets.length; i++){
            let value = this.buckets[i];
            if(value){
                if(!value.head.nextNode){
                    value.head.key === key ? exists = true : exists = false;
                }
                if(value.head.nextNode){
                    let tmp = value.head;
                    while(tmp != null){
                        if(tmp.key === key){
                            exists = true;
                            break;
                        }
                        tmp = tmp.nextNode;
                    }
                }
            }
            if(exists){
                break;
            }
        }
        return exists;
    }
    remove(key){
        let valueDeleted = false;
        for(let i = 0; i<this.buckets.length; i++){
            let element = this.buckets[i];
            if(element){
                let tmp = element.head;
                while(tmp != null){
                    if(tmp.key === key){
                        
                    }
                    tmp = tmp.nextNode;
                }
            }
            if(valueDeleted){
                break;
            }
        }
    }
    length(){
        let count = 0;
        this.buckets.forEach((value)=>{
            if(value != null){
                count++;
            }
        });
        return count;
    }
    clear(){
        this.buckets.splice(0);
    }
    keys(){
        let keys = [];
        this.buckets.forEach((value,index)=>{
            keys.push(index);
        });
        return keys;
    }
    values(){
        let values = [];
        this.buckets.forEach((value)=>{
            if(value != null){
                if(value.head.nextNode === null){
                    values.push(value.head.value);
                }
                else{
                    let tmp = value.head;
                    while(tmp != null){
                        values.push(tmp.value);
                        tmp = tmp.nextNode;
                    }
                }
            }
        });
        return values;
    }
    entries(){
        let keyValuePairs = [];
        this.buckets.forEach((value,index)=>{
            keyValuePairs.push([index, value]);
        });
        return keyValuePairs;
    }
}

let hashmap = new HashMap(16,0.75);
hashmap.set('headlessNode', 1);
hashmap.set('Luna', 2);
hashmap.set('chuna', 3);
hashmap.set('Moona', 4);
hashmap.set('cat', 5);
hashmap.set('act', 6);
hashmap.set('tac', 7);



console.log(hashmap);
console.log(hashmap.get('headlessNode'));
console.log(hashmap.get('Luna'));
console.log(hashmap.get('chuna'));
console.log(hashmap.values());
console.log(hashmap.has('Luna'));
hashmap.remove('act');
console.log(hashmap);
