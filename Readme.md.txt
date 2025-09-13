1) What is the difference between var, let, and const?
=>const variable can't be changed
let and ver variable can be changed.let variable can't be access upper the declaration.var can be access but it will show undefine.

2) What is the difference between map(), forEach(), and filter()?
=>map() --> use to modify the array element. And it must return an array.
forEach() -->it helps to go every element of an array one by one and do some operations.but it don't need to return something.
filter() -->use to get the element we need by using condition. And it must return an array after checking condition passed elements.

3) What are arrow functions in ES6?
=>shortest way to declear function in one line[no need to return something] or multiple line[need to return something] without using function keyword.

4) How does destructuring assignment work in ES6?
=>object properties can be used as a normal variable by destructuring.In this case we don't need to use dot notation or bracket notation.Ex:
const person{
           name:"Adnan",
	   age:23,
	   Salary:30000
}

//destructuring
let {name,age,Salary}=person;
console.log(Salary);

5) Explain template literals in ES6. How are they different from string concatenation?
=>use to write string inside `` this[backtic].we can write as we normally write."" this kind of notation don't distrub.if i want to get a new line just normally press enter 
but in string i need to write "\n" this.every string we need a + to add.in same backtic we can use doller sign for variable but in string style we need plus and write variable.
Ex:const name="Adnan";
const age=23;
const stringStyle="My name is"+name+"\n"+"Age is:"+age;
const templateStyle=`My name is${name}.
Age is ${age}.`
