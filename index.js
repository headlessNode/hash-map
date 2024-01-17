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
        const keyIndex = this.hash(key);
        if(this.buckets[keyIndex].nextNode === null && this.buckets[keyIndex].value === key){
            return this.buckets[keyIndex].value;
        }
        else if(this.buckets[keyIndex].nextNode === null && this.buckets[keyIndex].value != key){
            return null;
        }
        else{
            let element = this.buckets[keyIndex];
            let tmp = element.head;
            while(tmp != null){
                if(tmp.key === key){
                    return tmp.value;
                }
                tmp = tmp.nextNode;
            }
            if(tmp === null){
                return null;
            }
        }
    }
    has(key){
        let keyIndex = this.hash(key);
        let exists = false;
        let value = this.buckets[keyIndex];
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
        return exists;
    }
    remove(key){
        let keyIndex = this.hash(key);
        let element = this.buckets[keyIndex];
        if(element){
            let tmp = element.head;
            while(tmp != null){
                if(tmp.nextNode != null && tmp.nextNode.key === key){
                    let currNode = tmp;
                    let NodeToDelete = tmp.nextNode;
                    tmp.nextNode = NodeToDelete.nextNode;
                    break;
                }
                else if(tmp.nextNode != null && tmp.key === key){
                    let nodeToReplace = tmp.nextNode;
                    tmp.key = nodeToReplace.key;
                    tmp.value = nodeToReplace.value;
                    tmp.nextNode = nodeToReplace.nextNode;
                    break;
                }
                else if(tmp.nextNode === null && tmp.key === key){
                    this.buckets[keyIndex] = null;
                    break;
                }
                tmp = tmp.nextNode;
            }
        }
    }
    length(){
        let count = 0;
        this.buckets.forEach((value)=>{
            if(value){
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
        this.buckets.forEach((value)=>{
            if(value != null){
                let tmp = value.head;
                while(tmp != null){
                    keys.push(tmp.key);
                    tmp = tmp.nextNode;
                }
            }
        });
        return keys;
    }
    values(){
        let values = [];
        this.buckets.forEach((value)=>{
            if(value != null){
                let tmp = value.head;
                while(tmp != null){
                    values.push(tmp.value);
                    tmp = tmp.nextNode;
                }
            }
        });
        return values;
    }
    entries(){
        let keyValuePairs = [];
        this.buckets.forEach((value)=>{
            if(value != null){
                let tmp = value.head;
                while(tmp != null){
                    keyValuePairs.push([tmp.key, tmp.value]);
                    tmp = tmp.nextNode;
                }
            }
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
console.log(hashmap.keys());
console.log(hashmap.has('Luna'));
console.log(hashmap.remove('Luna'));
console.log(hashmap.entries());
console.log(hashmap);
