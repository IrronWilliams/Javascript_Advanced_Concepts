/*module focus on taking a deep dive into the parts of javascript language necessary to build serious applications 
and interest in moving on to build applications with frameworks. using a framework to build javascript applications
are ultimately optional. the following tools and concepts will provide what is needed to build projects on my own.  

modules allows me to spread out my app functionality going from a single file to multiple files, while still being 
able to share code between the files. can think of modules to being equivalent to const for variables, but for 
javascript files. we use const for variables not because its the most flexible but because it has the smallest 
degree of control. we use clearly defined variables that cannot be overwritten and do not change in their datatype. similar with modules,
we isolate functionality into separate files. modules help by keeping each bit of app clearly defined from each other. 

creating an app is not possible w/o having variables interact with each other. modules are a way that larger parts of applications 
interact with one another, yet live in their own clearly defined space. 

a module is just a file. one script is one module. can create a module with a script declaration via the html file. just set the type of
the script to module. modules can load each other and share code. however, an entire app can be built using a single module:
    <script src="index.js" type="module"></script>

using modules, still going to reference single javascript files that will be the main file in the app (the index.js file). as the app grows
larger, can create additional files and share code around the app however needed from file to file. 

SHARE APP CODE WITH MODULES....the following comments describe how to share code....

app displays date to user. creating an app class that returns basic html. the app contains a constructor that runs a method called
render(), which renders the app. the render() method is going to target a particular element called 'root'. root will be the entry
point of the application. render() will select the root element using getElementById(root) and using its innerHTML property, set it 
to dynamic html that includes the date: 
    render() {
    document.getElementById('root').innerHTML = `
      <div>Date: </div>
    `
i want to display the date beneath the this.render() line. 
        class App {
  constructor() {
    this.render()  
  }  DISPLAY DATE HERE  --> will need a function to create the data. 


within app, want to impose clear responsibility for different parts. do not want the app class to be responsible for everything. just 
want app class to be responsible for making the app itself and this related to this responsibility. for displaying the date, can have 
an external function that can accomplish this. this approach to having separate responsibilities is essential to having organized code
and is called separation of concern. simply don't want one class/data structure to be responsible for everything in the app. but rather
a separation of clearly defined tasks or set of tasks. if i know the role each bit of code plays, it will be easier to manage different
parts of application and get them to interact nicely. 

to begin, create a folder called 'utils'. utils (short for utility) is a conventional folder in javascript projects that hold functions 
that perform various tasks around app. within utils folder, create a javascript file called date.js. this will hold not only the function
i want to create to display the date, but also any date related functions that i might want to make in the future. 

within date.js file, create a function called getDate(). can get the current date by using the date constructor, new Date() and put 
results in variable called date and return value:
  function getDate() {
  const date = new Date()   
  return date 
}
    
now the function has been created, how do i use it the index.js file? if i were to now call getDate() from index.js, i will get an 
ReferenceError: getDate is not defined.  this is so because for index.js the getDate() function does not exist. so now that when using 
modules created values are not put on the global object. in fact, modules are automatically put in strict mode. and while in strict mode,
the behavior of putting things on the global window is regarded as an error. can easily confirm if in strict mode by console logging 'this'
    console.log(this)

if results are undefined/null, meaning global assignment is discouraged, i am in strict mode. in addition to each module being in strict 
mode by default, each module has its own top level scope. in other words, top level variables and functions from a module are not seen 
in other scripts. this is why the index.js file cannot see the getDate() function.  consequently, cannot and should not use the global 
object to share code around app. instead modules allows for 2 key words, import and export. import allows me to import functionality from
other modules. export labels variables and functions that should be accessible outside of the current module. 

we export a variable or function from a module and from any other module in app can import it. there is no limit to how many files can
import something exported.  one date.js file can export getDate() function to make it accessible/available around the app:

    export function getDate() {
  const date = new Date()   
  return date 
}
when using the export keyword for a piece of data, it is called a named export and the name is getDate(). can have many named exports 
per file. 

since i want to use getDate() in index.js, can import function with import keyword. import keyword must be at the top of the file before 
any other code. to import a named export, where must import the corresponding piece of data according to its name, and do so between {}.
in this example say import { getDate }. the curly braces provides a convenient way of organizing multiple imported values from a single
file. separate the values with commas, like creating an object. at end of import statement need to specify where the value is from by 
using the from keyword. and using a string, specify a path to the file that i am accessing. most of the paths that go from one file to 
another are called relative paths. from index.js, i can get to date.js thru the utils folder. i need to reference date.js thru utils 
folder, where date.js is a nested directory. to go into a nested directory, say ./the name of the folder/the name of file with the 
imported code. make sure to include '.js' at the end of imports if using modules via a script tag that has a 'type=module':
    import { getDate } from './utils/date.js'     script tag = <script src="index.js" type="module"></script> 

once i have this, i can use the imported coded as i like. to display date, can use temperate literals and interpolate the return value
of getDate() by calling it. 

render() {
    document.getElementById('root').innerHTML = `
      <div>Date: ${getDate()}</div>
    `
  }

named exports and imports are great when using files that export multiple things. can also add a named export for a variable
instead of function from date.js. this will be a variable for year. can get the current year by saying newDate() and chain on
the getFullYear() method. add export to make the variable year a named export:
  export const year = new Date().getFullYear()

to import into index.js, add the variable name in the import statement:
  import { getDate, year } from './utils/date.js'

can now use the variable year by displaying it and interpolating the variable:
  <div>Date: ${getDate()}, Year: ${year}</div>


since now have a couple of named exports from date.js, can use an alternate syntax to export everything from date.js in a single place. 
instead of including the export keyword before everything i want to export/make available to rest of app:
  export function getDate() {
  const date = new Date()   
  return date 
}

export const year = new Date().getFullYear()

can update by putting all named exports within {}

function getDate() {
  const date = new Date()   
  return date 
}

const year = new Date().getFullYear() 

export { getDate, year } 

for both named exports and named imports, can change the name of them using the 'as' keyword. this process is called aliasing. can apply
this approach if the named import has the same name as another variable. 

default exports are another way of exporting stuff from modules. modules can have as many named exports as i like but can only have at 
most just 1 default export. default exports are for when i have 1 thing in a file that i want to make available to rest of the app. can 
use export keyword before any value that i want to make a default export.  when importing default exports, do not have to use {} because
there is just one thing to import. can also name it anything i want w/o using keyword 'as'. can use both default exports and named exports
for the same file, but this is discouraged. avoid mixing them and stick to one import/export style per module. 

when a module is imported into a file, its executed only 1x. having multiple import statements, any statements after the 1st one will be 
ignored by javascript. having multiple statements will result in an error, SyntaxError: Identifier 'getDateNow' has already been declared.

import getDateNow from './utils/date.js' 
import getDateNow from './utils/date.js' 

if i tried to declare another variable, the multiple import statement will not be ignored. 


KNOW WHAT 'THIS' IS AT ANY TIMES

'this' is important and is present in virtually every context of the language. specifically 'this' is used when using methods of regular
objects, referencing values within classes, or trying to access an element or event in the DOM. 

'this' is a reference to an object. what makes 'this' tricky is the object that 'this' refers to can vary. the value for 'this' is 
implicitly set according to how a function is called. 'this' is not a fixed characteristic of a function based upon the functions 
definition, but rather a dynamic characteristic that is determined how a function is called. a function can be called in many ways:
  arrow function
  function declaration
  normal function
  method
  function constructor
  class
  within a call back function 

'this' is needed and important to understand.  one of the reasons why 'this' dynamically changes based upon how the function is called 
is so that method calls on objects, which delegate thru the prototype chain, can still maintain the expected 'this' value. 'this' being 
dynamic is essential for prototypical inheritance is essential for both constructor functions and classes to work as expected.

there are 4 main contexts where 'this' is given a dynamically different value. the value of 'this' is determined by its context:
1) in the global context
2) as a method on an object
3) as a constructor function or class constructor
4) as a DOM event handler
----------------------

________________________________________________________________________________________________________
1) in the global context:

within an individual script you can figure out what 'this' is equal to by console logging 'this'. console.log(this). this always refers
to an object. this will return the global object Window, which means working on windows object.  

functions have their own context. function declarations will also refer to the global object Window.  
function whatIsThis() {
    console.log(this) 
  }
  whatIsThis()

However this changes when in strict mode. when using strict mode, we get null/undefined for the 'this' value. 
function whatIsThis() {
  'use strict' 
  console.log(this) 
}
whatIsThis() 

it is better for 'this' to be undefined vs being assigned to the global window object. its very easy to mutate the global windows object.
removing strict mode in this function, here we are really saying window.something = 2. although, this well return '2', its mutating
the windows object. the scope of this function is leaking out to the outer scope which is the global window object. the scope leak 
contradicts the purpose of having a function in the 1st place. whenever possible, always want code to be in strict mode. fortunately, 
modules are in strict mode by default. 
  function whatIsThis() {
  //   console.log(this) 
  this.something = 2 
  console.log(something) 
  }
  whatIsThis() 
________________________________________________________________________________________________________
2) as a method on an object:

when we have a function on an object, we have a method. this method uses 'this' to refer to properties of the object. if i wanted 
the greetUser() method to greet user, will need to reference the first and last properties on it. can use the 'this' keyword to 
accomplish. it i have a user object with some data, any method can use the 'this' keyword confidently, knowing its going to refer to 
data on the object itself. calling the function will return the greeting as expected. 'Hi, Reed Barger'. 

const user = {
  first: 'Reed',
  last: 'Barger',
  greetUser() {
    console.log(`Hi, ${this.first} ${this.last}`)   
  }  
}
user.greetUser()


if an object was nested inside another object. object userInfo has addtl piece of info for title and the user data was provided as a 
nested object and therefore as a property of userInfo. to call the greetUser() function: -> userInfo.user.greetUser() will still return 
'Hi, Reed Barger'. for any method, 'this' refers to the object that is on, in this case user. Or thought of another way, 'this' will refer
to the object on the immediate left hand side of the dot when calling a method. in this case when calling greetUser(), the object user is 
on the immediate left hand side of the dot.   
const userInfo = {
  title: "Programmer",
  user: {
     first: 'Reed',
     last: 'Barger',
     greetUser() {
      console.log(`Hi, ${this.first} ${this.last}`)   
     }   
  }  
}
userInfo.user.greetUser()

however if trying to access data from the userInfo object, such as the title, will get undefined. Hi, Reed Barger undefined. 'this' does 
not refer to the parent object userInfo. although userInfo is on the immediate left side of dot, not calling userInfo as its not a method.

const userInfo = {
  title: "Programmer",
  user: {
     first: 'Reed',
     last: 'Barger',
     greetUser() {
      console.log(`Hi, ${this.first} ${this.last} ${this.title}`)   
     }   
  }  
}
userInfo.user.greetUser()
________________________________________________________________________________________________________
3) as a constructor function or class constructor

when using the 'new' keyword, it creates an instance of a class or constructor function. for example, have the class User, and for its 
constructor method providing as instance properties first name of user and age and put them on 'this' as this.first = first, etc. there 
is also a getAge() method on the class body which console logs the users name and age. when a class is instantiated with new, the 'this'
keyword is bound to that instance. when providing name Bob and age to User and getting the created user (via variable user), we can use
any class methods with confidence knowing it can refer to instance properties with the 'this' keyword. returns Bob age is 24

class User {
  constructor(first, age) {
    this.first = first 
    this.age = age   
  }  
  
  getAge() {
    console.log(`${this.first}'s age is ${this.age}`)   
  }
}
const user = new User('Bob', 24) 
user.getAge() 

understanding classes work based off of constructor functions and prototypical inheritance. so the same rules also apply to separate 
constructor functions. rewriting the class as a constructor function which includes adding a method to the prototype where if it was a 
function declaration and had a 'this', will return the same expected results comparable to the class. returns jane's age is 25. 

function User(first, age) {
  this.first = first 
  this.age = age 
}

User.prototype.getAge = function() {
  console.log(`${this.first}'s age is ${this.age}`)   
}
const user2 = new User('jane', 25) 
user2.getAge() 
________________________________________________________________________________________________________
4) as a DOM event handler

in the browser there is a special 'this' context for event handlers. in an event handler called by addEventListener(), 'this' will refer
to event.target. developers use event.target that they get from a given event from addEventListener(). programmers use event.target 
to access elements in the DOM. since the 'this' reference changes in this context, its important to know what 'this' is referencing. 

this example creates a button, stores in a variable called button. can do this by using the createElement() method from the document. 
then give it the button the text content click. then add it to the document body. 

then add an event listener to button to be able to click on it by using a click event. can use a function declaration to get the 
event data, but console logging 'this' give me access to the button element. when clicking the button, what returned =  <button>

  const button = document.createElement('button') 
  button.textContent = "Click" 
  document.body.appendChild(button) 

  button.addEventListener('click', function() {
    console.log(this) 
  })
________________________________________________________________________________________________________

in the 4 examples, the value of 'this' was determined by its context. using some new functions (and some old), can explicitly determine
what 'this' should refer to. these functions are:
call()
apply()
bind()

call() and apply() are similar in that they both allow to call a function on a certain context. say for example have a user object 
consisting of user name and title. also have a function printUser() and relies on the 'this' context for this.name and this.title. 

const user = {
  name: "Reed",
  title: "Programmer"  
}

function printUser() {
  console.log(`${this.name} is a ${this.title}`) 
}
printUser.call(user) 
printUser.apply(user)   //apply works just like call. 

since 'this' refers to an object, need an object with the properties of first and title. which are in the user object. how do i connect
the user object and printUser() function? how do i call printUser() with the user object data? can use call() for this. by using call() 
the function and object are connected/have a relationship. its like the printUser() function has become a property of the user object. 
call() allow me to dynamically set the 'this' context for the function. returns Reed is a Programmer
  printUser.call(user)   -> passing in the user object. 


to see how call() and apply() sets the 'this' context, whatever is passed to call() or apply() is what the this context will be set to 
for a given function.  both call() and apply() will return -> {first: "Reed"}

function whatIsThis() {
  console.log(this) 
}
console.log(whatIsThis.call({ first: "Reed" }))  -> passing object. object will be set to 'this'
console.log(whatIsThis.apply({ first: "Reed" })) 

in this program, can pass user as the 'this' context because using this.name and this.title. after setting the 'this' context, can pass in 
additional arguments to call(). can specifically pass in arguments for the city = London, country = England. this appropriately passes the 
necessary arguments to the function. returns Reed is a Programmer in London, England.

const user = {
  name: "Reed",
  title: "Programmer"  
}

function printBio(city, country) {
  console.log(`${this.name} is a ${this.title} in ${city}, ${country}`) 
}
printBio.call(user, 'London', 'England') returns -> Reed is a Programmer in London, England
printBio.apply(user, ['London', 'England'])  returns ->  Reed is a Programmer in London, England

how you pass additional arguments is how apply() and call() differ. when passing arguments with apply(), need to pass the arguments not 
set to 'this' as a single argument that is in an array. the array can take any number of elements and those elements will be provided as 
separate arguments to the function that i am applying them to.  in summary, call() takes separate elements whereas as apply() takes any 
further arguments as an array. 

call() and apply() are one time use methods. meaning, i will need to use call(), apply() every time i call the function. to use a method
repeatedly with the 'this' context of another object, can use the bind() function. bind() give a brand new function with an explicity 
with an explicitly bound 'this'. so it will always be bound to the context i provide to it. so printUser() is always going to be bound
and therefore have a 'this' context to the user object. so bind() returns a function that i can call as many times as i need. this 
returns the same previous result -> Reed is a Programmer. 

  const user = {
    name: "Reed",
    title: "Programmer"  
  }

  function printUser() {
    console.log(`${this.name} is a ${this.title}`) 
  }
  const userDescription = printUser.bind(user) 
  userDescription()

benefit of bind() is that it will not allow me to bind to multiple 'this' contexts. this program initially binds printUser() function 
to the to user object.  program later tries to bind printUser to the user2 object. when calling userDescription() function, will return
Reed is a Programmer. this is good because it confirms that it is still bound to the 1st 'this' context used. so bind() is for good, 
remains for the life of the program. 

  const user = {
    name: "Reed",
    title: "Programmer"  
  }

  function printUser() {
    console.log(`${this.name} is a ${this.title}`) 
  }
  const userDescription = printUser.bind(user) 

  const user2 = {
    name: "Doug",
    title: "Entrepreneur"  
  }
  printUser.bind(user2)
  userDescription() 

arrow functions do not have their own 'this' binding. program has an object with a first property, a function declaration which has their 
own 'this' to say 'this.first' on the object. also includes an arrow function as a method and console log this.first. calling user.fn()
will return Bob, which is the property that i referred to off of the 'this', the object itself. 

calling the arrow function will return null. arrow functions do not have their own 'this' binding. instead arrow functions go up the next 
execution context. this arrow function will only work in the example of a nested object. 

  const user = {
    first: 'Bob',
    fn() {
      console.log(this.first)  
    },
    arrowFn: () => {
      console.log(this.first)   
    }
  }
 user.fn()     -> returns Bob
 user.arrowFn()   -> returns null/undefined

In summary, 4 different ways of calling a function that determines its 'this' binding. notes will help assess where 'this' is at all times.

1) in the global context  -> (global Object or undefined in strict mode)
2) as a method on an object  -> (object on left side of dot when method is called)
3) as a constructor function or class constructor -> (the instance itself when called with new)
4) as a DOM event handler ->  (the element itself)

to help demistify what 'this' is:
understand what 'this' is going to be dynamically set to whenever a given function is called. 
use call(), apply() and bind() to manually set the 'this' context.  


UNDERSTAND STATE AND STATE MANAGEMENT

State is the data the has to be managed in the application. data that comes from the user and what needs to be kept track of in order for
the app to work. with the google keep clone, the data that i needed to keep track of from the user was the info user typed into form inputs.
what did i do with this value? i stored it in inputs and used it as i needed it. the form data that i used was 'state'. i also had to keep
track of note data from other form submissions, including the title, text and id of each note which was stored in array. this was another
piece of state. all the pieces of data i manage in the app as the user interacts with it is a form of 'state'. state is important because 
it tells me the status of the application. 

the benefit of state management is that it makes the state of the app, the invisible collection of data visible. we make it visible by  
making it a data structure where i can either get the values freed from state or update the values set state at any time. 

the class App purpose is to greet a user if there is one. if there is no user, show message asking guest to sign in. app is showing one 
or another message based on a given state, the user related state. the app is being run entirely by javascript. the render() method is 
being called in the constructor, which is setting the innerHtml of the div with the id of root which comes from the html document. then 
reaching into the DOM to find the id with the element of user-message. the using the checkAuth() function to dynamically change the 
textContent of the user message element according to whether there is a user or not. the app greets user if user = true. if user = false, 
show error message asking user to sign in. 

currently not managing state. its not easy to know where my state is. but if i look into the checkAuth() method, is see there is a user 
state that is coming from somewhere. i'm defining it locally here, but it could come from anywhere. if i look at the conditional within
checkAuth(), is see there is an error state as well. i'm just inferring that because the text is being set to red. i am not explicitly 
saying there is an error message. i cannot expect anyone looking at my code to be able to determine what state values this class manages.

this is an important part of managing state. not just doing something with the values i am holding on to, but also communicating to 
other developers what stuff i care about. so need to present that values in a more readable place. a 2nd question regarding if i am 
managing state well is where the state lives. right now, state does not live in an obvious place. other developers will have to look at 
the content of the user message element to figure out the state. so part of my state is in the checkAuth() method and the other part is in
the DOM. in other words, state is spread out. an improvement will be to rewrite the code so the state, all values i am keeping track of, 
are in an obvious place for any developer to find w/o having to read all of the code. another improvement will be to have state live in a
more centralized place. rather than random places around the class. 

when i write my classes or any other data structure i use to organize my app, i want to manage my state to operate as my single source of 
truth. meaning, if i want to figure out what the status of my app is at any moment, i look to where i store my state. the way that state 
is most consistently managed across popular javascript libraries is using objects. state in this class will live in a dedicated state
object that will live at the top of the constructor. developers interested in knowing the state values i am keeping track of and matter
for the class will look here.

in this app, i care if i have a user, (user state), because it informs which message will be shown. also care about if there is an error. 
so there is a user related state and an error state. for the user state, i have a local user variable, const user = false. i can express
this in the state object as a property called isAuth (short for is authenticated). isAuth will have the same possible states (true/false),
user is authenticated or not. also will have an error piece of state. the error state will store an error message as a string. 

since i want the state object to be single source of truth for the app, i want to rewrite the functionality of the code to rely on the
values i have in state at any given point in time. to accomplish this, i want to 1st set state or update state accordingly. this is what 
the use of the checkAuth() function is for. instead of immediately putting the app state in the DOM, i can update the state object. if the
user is true, then isAuth() should be in sync with that, meaning the isAuth() property on state should also be set to true. i do not want 
to mutate state directly by saying this.state.isAuth = true. instead do a shallow clone of the state object with the spread operator to get
the previous state and then update the value that i want to change to isAuth is true. this.state = { ...this.state, isAuth: true }. 
now that i've made a copy, i can replace the old state with the new state:
  this.state = { ...this.state, isAuth: true }

the same applies to the error text. previously there was an error text saying 'you must sign in'. similarly can copy the previous values of
state into a new state object and set the error property to the message im providing to the textContent property, 'you must sign in':
  this.state = { ...this.state, error: "You must sign in!" }. 
can now get rid of the user messages entirely:
  this.$userMessage = document.getElementById("user-message") 
  this.$userMessage.textContent = "Welcome back!" 
  this.$userMessage.textContent = "You must sign in!" 
  this.$userMessage.style.color = "red" 

within constructor now want to 1st call checkAuth() before calling render() function. 

this is a more logical order in the constructor. i create state, checkAuth(), update state accordingly, then render html after i have
the data because what i display on page is dependent upon state. 

now i don't need to dive into the DOM to change the text. with this new state after calling checkAuth(), i can determine how to structure 
a rendered content. currently in render(), if isAuth() is true, display message 'welcome back'. can replace the span with a ternary. 
if isAuth() is true, display 'welcome back', otherwise there is not user if isAuth() is false, display 'you must sign in'. can get text for 
otherwise from the new error state, this.state.error:
  ${this.state.isAuth ? 'Welcome back' : this.state.error}

using the power of destructuring, can make this even more legible by getting the properties i need from this.state. from this.state can 
pluck off just the properties i need, which is isAuth() and error. so ternary can remove reference to this.state. result is a much more
readable statement. 

if other developers do not understand whats going on based upon the state via the constructor. they can see the state represented in
the html as well. the state and the html reflects the state thats stored in the state object. this respects the single source of truth 
principal. 

to take care of the red text for the error message, can use short circuiting by using the inline styles on the enclosing divs. in the 
div, can set the style attribute to the color of the text if error is true. if error is true, set color to red. the program will move to 
the ternary and display 'welcome back' if user is true and display 'you must sign in' in red if user is false. 

in summary, the overall benefits and approach to state management:

use state objects to declare and manage important data:
    this.state = {
       isAuth: false,
       error: ''  
    }   

update state immutably:
    this.state = { ...this.state, isAuth: true } 

state is the single source of truth to determine the rendered content of the app:
    const { isAuth, error } = this.state  
      
    document.getElementById("root").innerHTML = `
      <div style="color: ${error && 'red'}">
        ${isAuth ? 'Welcome back!' : error}
      </div>
    ` 



HOW REDUCERS HELP MANAGE STATE 

reducers helps manage app state and is used in almost all javascript libraries and frameworks (react, angular, vue), particularly in the 
state management libraries redux and ngrx. reducer is a simple javascript function. a reducer is a function that takes 2 arguments, the 
current state and an action and based upon these 2 arguments, returns a new state. this idea can be expressed in a single line almost as 
a valid function: 
    const reducer = (state, action) => newState


for an app that has a counter where it can increment or decrement a number by 1. create a reducer and call it counterReducer(). this is 
named so because i am making a reducer that manages the counter or count piece of state. this function will be executed to update state
whenever a user wants to count up or down. in the function body want to return state +1. for now when i call counterReducer() my counter 
increases by 1 every time.  to make it more clear, can update the argument from state to count and return count +1 for the count state:

    function counterReducer(count, action) {
  return count + 1   
}

can provide the initial count value of 0. with this the return value should be 1. the following will return true.
  console.log(counterReducer(0) === 1)

reducers are special because they are predictable. in other words, they are whats known as pure functions. pure functions is a concept 
from functional programming where giving a certain input to a function, the function will always return the same output. pure functions
are ideal for doing something i need to have reliable values for, such as managing state. so whatever value i provide to the count, i always
want it to increment by 1 and do nothing else. so this is the benefit of reducers being an instance of pure functions. 

reducers second argument action allows me to communicate to the reducer that i want to perform a different state update. for example, i may
not always want to increase the count. i may want to decrement the count, therefore the state, and communicate this through the action. 
the action is a simple javascript object that has the type of action the user wants to perform. in this example, if user wanted to 
increment the count, the action would be the type property set to the sting increment. so provide the type of action i want on the type
property and the type is always a sting. convention is to make string uppercase. this makes clear what action is taking place.  
  { type: 'INCREMENT' }

to create a decrement action, change the type property of action object to decrement in all caps. 
  { type: 'DECREMENT' } 
  

for this to work will need to add additional logic within reducer to update state accordingly based upon the action type provided. can 
have an if/else but some reducers can have many, many conditions. the switch statement, a different type of flow control, is a better
and more concise choice.  for switch statement, going to switch based upon action type. will have cases that match all of the possible
types within app that reflect all of the different possible state updates i may want to perform. 

the 1st case will have increment. the 2nd case will have decrement. to increment the count, return count+1. to decrement the account, 
return count-1. can use return instead of break because can exit the function after the condition is run. need to provide a default case
if none of the arguments match the cases. for default, return count, which is returning the previous state. call counterReducer(), pass
in the initial count of 0. for action pass an object that will have a type of increment. the 1st statement runs the increment case and 
increases count by 1. the 2nd statement decrements the current state by 1 resulting in final state of 0. 
  counterReducer(0, { type: 'INCREMENT' })
  const result = counterReducer(1, { type: 'DECREMENT' })  // 0
  console.log(result === 0)


with many applications, there will be more complex values than a single number to manage. there will likely not be a javascript primitive 
in state, but rather an object that is used to manage information. with objects can manage more data in an orderly way. 

re-imagining this app with an object rather than having the count number be the entire state. instead have a state object with multiple
properties. considering pure functions, state objects need to be immutable and should only provide a predictable output based upon a 
given input. in other words, they cannot perform any side effects. with an object, to make state updates immutable, update the cases. 
instead of returning count +1, provide the count as a property on an object.for the increment case, count property will be set to 
count: count+1 and for the decrement case count property will be set to count: count-1. instead of managing count, now have a state object.
so can rename parameter from count to state. so count as a property of the previous state will be state.count. 

if there are other properties on the state object, i would want to merge them with the new object i am creating with to perform 
update immutably.  
  { count: state.count + 1 }

this immutable update can be done with the spread operator. 1st spread in previous state, then update a single property at a time:
  { ...state, count: state.count + 1 }

this is an essential part of using reducers and managing application state. states managed largely through objects and state updates must
always be immutable. create a new state object (with spread operator) from the incoming state (passed as argument when function called) 
and the part i want to change (count property). this way, i ensure the other properties that are not being touched with the current state
update are still preserved for the new state thats being returned. the pattern of spreading in the old state and updating a single piece 
of state for each case { ...state, count: state.count + 1 }, will become a very familiar pattern with my reducers. for default case return
the entire state object if none of the cases match. 

with a more complex example, need to manage the user state, namely user name and email. in app, want users to be able to update their 
names and email. this responsibility will be given to the reducer. because reducer is going to manage user state, call function 
userReducer() and have state and action as parameters. within switch statement, switch based on the type.property from the action object. 
within action object, will have 2 cases that correspond with 2 cases. 1st case is for changing the users name. with uppercase naming 
convention, want to separate each upper case word with underscore the other case will be for user to change email. default case returns 
previous state. 

  function userReducer(state, action) {
  switch (action.type) {
     case "CHANGE_NAME":
     case "CHANGE_EMAIL":
     default:
       return state  
  }  
}

if user updates their info via a form, we receive the form values thru the action, but thru another property on the action called the
payload. on the payload property, can accept any data that i like. to write an action for the change_name case, for the payload property
to get the user name the user want to change it to, i can set it to whatever the user typed in by accepting a string immediately.  
  { type: 'CHANGE_NAME', payload: 'alskjdfajlksfd' }

a better way to handle this is to make payload an object itself. this allows me to provide multiple values to the payload if necessary. 
each of the values will be very clear as to what they are. for example user name will have a property called name and wants to change
name to joe. the way to access the name from action, can say action.payload.name, which is more descriptive. within switch statement, to 
update state/the name, return a new object where i spread in all the other state properties that i am not updating and for the name case, 
set to action.payload.name. 

for email, will need a type that corresponds with change_email case. for payload, need an email property. within change_email case, spread
in previous state, which will now include property for name. to update the email with new email value, use action.payload.email. 

for testing purposes, say there was an initial state where i had a user within the app, and put the initial data in an object called
initialUser. which consisted of user name mark and email mark.gmail. in order for mark to update his email, need to call 
userReducer(), provide or pass in the initialUser object. for the action, provide an object where the type is set to the action i want to
perform, which is change_email. and the payload is going to be the email that mark has changed/wants to use moving forward. this will 
execute the reducer and change the email state. 
  userReducer(initialUser, { type: 'CHANGE_EMAIL', payload: { email: 'mark@compuserve.com' } })

should expect the results of the new email to equal the email that was provided mark@compuserve.com. logging the comparison will return
true. proves i am performing state update successfully. 
  console.log(result.email === 'mark@compuserve.com')


with reducers, readability is important. want to easily at a glance understand what is taking place within each state update. 

in summary, reducers are one of the most powerful techniques for managing application state. for syntax, reducer function is expressed
a combination of previous state as well as a new action to create a new state. (state, action) => newState. state updates are performed
immutably, state is never changed directly. the reducer is responsible for creating a new state w/o any side effects. can also 
conditionally update state within reducer with help of a switch() statement where switch is based on an action user wants to perform. in 
addition, if state update requires more info, can provide an optional payload.

AVOID IMPERATIVE. WRITE DECLARATIVE CODE

there are 2 styles of writing code and a persons code usually does not fall into one category or the other. but this is how the styles are
referred to generally. code can either be imperative or declarative. imperative code is when we write code more suitable for a computer.
declarative code is code that a person would like to read, or code for people. imperative code is when we tell javascript what to do and
how to do it. 

for example, have an array of people and want to invite these people to a party by writing them an individual invitation. in addition 
to people array, have an array that stores the invitations. to create these invitations, need to iterate over the people array. using a 
for loop, iterate over the people array, get each element from array and add it to a message, then add the message to a new array. however,
the code does not say the same message. by reading the code, the 1st iteration, the variable i is set to 0. then checking to see if i is 
less than the current length of the array. then add 1 to i after the iteration. then interpolating the ith value of the array to a string 
and putting it in the same index in a different array. this is all imperative, telling javascript exactly what to do and how to do it.
the code is correct. it returns all of the created invitations. 

the for loop is undeniably the most popular way to iterate over arrays. however, its imperative, hard to read and difficult to remember
how to write even for experienced javascript developers.*/
const people = ['Doug', 'Fred', 'Jane'] 
const invitations = [] 

for (let i = 0  i < people.length  i++) {
    invitations[i] = `Hi ${people[i]}, come to my party!` 
}
console.log(invitations) //returns  ["Hi Doug, come to my party!", "Hi Fred, come to my party!", "Hi Jane, come to my party!"]

/*
declarative code is different. as the name implies, i declare with it what i want to accomplish and javascript will do it. declarative
code is readable to humans and instructive to the computer. in fact, its readability to other developers is the priority. 

to rewrite in declarative style, can take advantage of the numerous array methods. want app to send an invitation message to an array of 
people. with declarative code, it all sits on one line, is far more comprehensible, vastly more succinct and clear at the same time. this
is what pursuing a declarative code style will deliver.  

unlike the imperative code, did not need to create confusing variables such as i or tell javascript to go thru the array. i just mapped, 
or iterated over the array, added each persons name to the invitation and it was returned in a new array. 

its best to pursue a declarative style because its more memorable and code is written for people not computers. scrutinize and re-read 
my code for legibility and understanding just as if i was writing a essay. strive for practices that make my code more declarative. it 
won't just help other programmers but myself as well especially when i revisit code years later after forgetting about what it does. 
*/
const people = ['Doug', 'Fred', 'Jane'] 
const invitations = people.map(person => `Hi ${person}, come to my party!`) 
console.log(invitations) 