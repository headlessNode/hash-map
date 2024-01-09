class Node{
    constructor(data, key){
        this.key = key;
        this.value = data;
        this.nextNode = null;
    }
}

export class LinkedList{
    constructor(data, key){
        this.head = new Node(data, key);
    }
    append(data, key){
        let tmp = this.head;
        while(tmp.nextNode != null){
            tmp = tmp.nextNode;
        }
        tmp.nextNode = new Node(data, key);
    }
}