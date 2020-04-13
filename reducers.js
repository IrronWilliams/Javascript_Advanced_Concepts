/*
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
in state, but rather an object that is used to manage information. with objects can manage more data in an orderly way. */
function counterReducer(count, action) {
  switch (action.type) {
    case 'INCREMENT':
      return count + 1   
    case 'DECREMENT':  
      return count - 1 
    default:
      return count 
  }  
}
counterReducer(0, { type: 'INCREMENT' })  // 1
const result = counterReducer(1, { type: 'DECREMENT' })  // 0
console.log(result === 0) 

/*
with many applications, there will be more complex values than a single number to manage. there will likely not be a javascript primitive 
in state, but rather an object that is used to manage information. with objects can manage more data in an orderly way. 

re-imagining this app with an object rather than having the count number be the entire state. instead have a state object with multiple
properties. considering pure functions, state objects need to be immutable and should only provide a predictable output based upon a 
given input. in other words, they cannot perform any side effects. with an object, to make state updates immutable, update the cases. 
instead of returning count +1, provide the count as a property on an object. for the increment case, count property will be set to 
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

*/
function counterReducer(state, action) { //renaming parameter to state 
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }  //spread in previous state, update single property. count as a property of the previous state = state.count. 
    case 'DECREMENT':  
      return { ...state, count: state.count - 1 }  
    default:
      return state 
  }  
}
counterReducer(0, { type: 'INCREMENT' })  // 1
const result = counterReducer(1, { type: 'DECREMENT' })  // 0
console.log(result === 0) 

/*
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

*/
const initialUser = {
  name: 'Mark',
  email: 'mark@gmail.com'  
} 

function userReducer(state, action) {
  switch (action.type) {
     case "CHANGE_NAME":
       return { ...state, name: action.payload.name } 
     case "CHANGE_EMAIL":
       return { ...state, email: action.payload.email } 
     default:
       return state  
  }  
}
const result = userReducer(initialUser, { type: 'CHANGE_EMAIL', payload: { email: 'mark@compuserve.com' } }) 
console.log(result.email === 'mark@compuserve.com') 