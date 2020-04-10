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

*/

