// typescript 
// let message: string = 'Hello, TypeScript!';
// let heading = document.createElement('h1');
// heading.textContent = message;
// document.body.appendChild(heading);
//Type Annotation
//let name :string = 4;// get an error coz name type is string and value is number .
//let name :string = 'Hiral'; //valid
//type:Object
// let person: {
//     id:number,
//     name: string;
// };
//  person = {
//     id:1,
//     name: 'John'
//  }; // valid
// function setCounter(max=5) {
//     console.log(max)
// }
// Contextual typing
// document.addEventListener('click', function (event) {
//     console.log(event.button); 
// });
//string
// let fname: string = `hiral`;
// let lname: string = `makwana`;
// let fullname: string = `I'm ${fname} ${lname}`; string concat
// console.log(fullname);
//mixed type array
// let scores : (string | number)[];
// scores = ['Programming', 5, 'Software Design', 4]; 
// console.log(scores);
//if..else
// const max = 20;
// let counter = 1;
// if (counter < max) {
//     console.log(counter);
//     counter++;
//     console.log(counter);
// } else {
//     counter = 1;
// }
//while,break
var counter = 1;
while (counter <= 5) {
    console.log(counter);
    counter++;
    if (counter == 3)
        break;
}
