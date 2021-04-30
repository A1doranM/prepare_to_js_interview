// (function (a) {
//     let a1 = a;
//     return {
//         plus: function (b) {
//             let b1 = b + a1;
//
//             return {
//                 minus: function (c) {
//                     let c1 = b1 - c;
//
//                     console.log(c1);
//                 }
//             }
//         }
//     };
// })(4).plus(4).minus(4);


// let a = eval([4, 2, 3, 7].join('+'));

// function Book(name, author) {
//     this.name = name;
//     this.author = author;
//     return this;
// }
//
// function Foo(Cclass, name, author) {
//     __proto__: Book;
//     return Cclass.call({}, name, author);
// }
//
// var book = Foo(Book, 'js', 'petr');
// console.log(book);

// class Human {
//     #name2;
//
//     constructor(name) {
//         this.#name2 = name;
//     }
//
//     get name(){
//         return this.#name2;
//     }
// }
//
// let h = new Human("as");
// console.log(h.name);
//Write function that take two strings and return the longest subsequence of s1 and s2
