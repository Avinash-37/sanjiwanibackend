/**
 * Array.find()
 */
//simulating find function
/*
class Array{
  constructor(arr){
    this.arr=arr
  }

  find(predicate){
    for(let i=0;i<this.arr.length;i++){
      if(predicate(this.arr[i])){
        return this.arr[i];
      }
    }
  }
}
*/
//console.log(new Array([1,2,3,4,5,6]).find((number)=> number == 3)); //



let Numbers = [1,2,3,4,5,6]

let number = Numbers.find(number => number == 3);

console.log(number); // 3