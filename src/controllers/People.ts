class People {
    name: string;
    age: number;    
 
    constructor(name: string, age: number) {
        this.name =  name;
        this.age = age; 
        console.log(this);
    }

    walk(): void {
        console.log(this.name + " (" + this.age + ") is walking");        
    }
}
 
export { People };
