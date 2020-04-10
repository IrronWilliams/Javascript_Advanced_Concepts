/*since i want to use getDate() in index.js, importing getDate() function from date.js. import keyword must be at the top of the file 
before any other code. at end of import statement need to specify path to the date.js since relative path, begin with './'


*/
//import { getDate, year } from './utils/date.js' 
//import { getDate, year as currentYear } from './utils/date.js' //using aliasing to avoid conflict with the variable year. 
import getDate from './utils/date.js'  //using default export

const year = 2019 
/*
class app returns basic html. the app contains a constructor that runs a method called render(), which renders the app. the render() 
method is going to target a particular element called 'root' (from html). root will be the entry point of the application. render() 
will select the root element using getElementById(root) and using its innerHTML property, set it to dynamic html that includes the date.

can now use the imported code to display date by using temperate literals and interpolate. within temperate literal, access the return 
value of getDate() by calling it. also using exported variable year. 
*/
class App {
  constructor() {
    this.render()  
  }  

  /* option for import { getDate, year } or aliasing. 
  render() {
    document.getElementById('root').innerHTML = `
    <div>Date: ${getDate()}, Year: ${currentYear}</div> 
    `
  }
  */

 render() { //using default export from date.js. interpolating getData() which calls the getDate() function from date.js 
  document.getElementById('root').innerHTML = `
    <div>Date: ${getDate()}</div>
  `
}
}

// import / export

new App()  //instantiate the app class with new App()