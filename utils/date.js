/*creating function to generate the current date by using the date constructor and putting results in variable 
called date and returning value. 

using export keyword to share function/make it accessible across the entire application. when using the export 
keyword for a piece of data, it is called a named export. the named export is getDate(). 

also creating a named export for the variable 'year'. obtaining current year saying newDate() and chaining on
the getFullYear() method. adding keyword export to make the variable year a named export. 

one way of using export:  

export function getDate() { 
    const date = new Date()   
    return date 
  }
export const year = new Date().getFullYear() 

can update by putting all named exports within {}*/

/*Approach 1 
function getDate() { 
    const date = new Date()   
    return date 
  }
const year = new Date().getFullYear() //year variable can be used globally
export { getDate, year }              //specifically exporting getDate function and year variable
*/

/*Approach 2 with export default
updating to so that only exporting the getDate() function and using the year variable locally. interpolating results of new Date() 
and year. using keywords 'export default' before the value i want to make an export default. need to update import statement on 
index.js.   */
export default function getDate() {
  const year = new Date().getFullYear()
  const date = `${new Date()}, year: ${year}` 
  return date
}