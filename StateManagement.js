/*
State is the data the has to be managed in the application. data that comes from the user and what needs to be kept track of in order for
the app to work. with the google keep clone, the data that i needed to keep track of from the user was the info user typed into form inputs.
what did i do with this value? i stored it in inputs and used it as i needed it. the form data that i used was 'state'. i also had to keep
track of note data from other form submissions, including the title, text and id of each note which was stored in array. this was another
piece of state. all the pieces of data i manage in the app as the user interacts with it form 'state'. state is important because it 
tells me the status of the application. 

the benefit of state management is that it makes the state of the app, the invisible collection of data visible. we make it visible by a 
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
more centralized place. rather than random places around the class. */
class App {
    constructor() {
      this.render() 
      this.$userMessage = document.getElementById("user-message") 
      this.checkAuth() 
    }
  
    checkAuth() {
      const user = false 
      if (user) {
        this.$userMessage.textContent = "Welcome back!" 
      } else {
        this.$userMessage.textContent = "You must sign in!" 
        this.$userMessage.style.color = "red" 
      }
    }
  
    render() {
      document.getElementById("root").innerHTML = `
        <div>
          <span id="user-message"></span>
        </div>
      ` 
    }
  }
  new App() 

/*
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
the data because what i display on page is dependent upon state. */
class App {
  constructor() {
    this.state = {
       isAuth: false,
       error: ''  
    }   
      
    this.checkAuth() 
    this.render() 
    // this.$userMessage = document.getElementById("user-message") 
  }

  checkAuth() {
    const user = true 
    if (user) {
      this.state = { ...this.state, isAuth: true } 
    //   this.$userMessage.textContent = "Welcome back!" 
    } else {
      this.state = { ...this.state, error: "You must sign in!" } 
    //   this.$userMessage.textContent = "You must sign in!" 
    //   this.$userMessage.style.color = "red" 
    }
  }

  render() {
    document.getElementById("root").innerHTML = `
      <div>
        <span id="user-message"></span>
      </div>
    ` 
  }
}
new App() 

/*
now i don't need to dive into the DOM to change the text. with this new state after calling checkAuth(), i can determine how to structure 
a rendered content. currently in render(), if isAuth() is true, display message 'welcome back'. can replace the span with a ternary. 
if isAuth() is true, display 'welcome back', otherwise there is not user if isAuth() is false, display 'you must sign in'. can get text for 
otherwise from the new error state, this.state.error:
  ${this.state.isAuth ? 'Welcome back' : this.state.error}

using the power of destructuring, can make this even more legible by getting the properties i need from this.state. from this.state can 
pluck off just the properties i need, which is isAuth() and error. so ternary can remove reference to this.state. result is a much more
readable statement. */
class App {
  constructor() {
    this.state = {
       isAuth: false,
       error: ''  
    }   
      
    this.checkAuth() 
    this.render() 
    // this.$userMessage = document.getElementById("user-message") 
  }

  checkAuth() {
    const user = true 
    if (user) {
      this.state = { ...this.state, isAuth: true } 
    //   this.$userMessage.textContent = "Welcome back!" 
    } else {
      this.state = { ...this.state, error: "You must sign in!" } 
    //   this.$userMessage.textContent = "You must sign in!" 
    //   this.$userMessage.style.color = "red" 
    }
  }

  /*prior to destructuring 
  render() {
    document.getElementById("root").innerHTML = `
      <div>
        ${this.state.isAuth ? 'Welcome back' : this.state.error}
      </div>
    ` 
  }
  */

  //applied destructuring
  render() {
    const { isAuth, error } = this.state  
      
    document.getElementById("root").innerHTML = `
      <div>
      ${isAuth ? 'Welcome back' : error}
      </div>
    ` 
  }
}
new App() 

/*
to take care of the red text for the error message, can use short circuiting by using the inline styles on the enclosing divs. in the 
div, can set the style attribute to the color of the text if error is true. if error is true, set color to red. the program will move to 
the ternary and display 'welcome back' if user is true and display 'you must sign in' in red if user is false. 
*/
class App {
  constructor() {
    this.state = {
       isAuth: false,
       error: ''  
    }   
      
    this.checkAuth() 
    this.render() 
    // this.$userMessage = document.getElementById("user-message") 
  }

  checkAuth() {
    const user = false 
    if (user) {
      this.state = { ...this.state, isAuth: true } 
    //   this.$userMessage.textContent = "Welcome back!" 
    } else {
      this.state = { ...this.state, error: "You must sign in!" } 
    //   this.$userMessage.textContent = "You must sign in!" 
    //   this.$userMessage.style.color = "red" 
    }
  }

  render() {
    const { isAuth, error } = this.state  
      
    document.getElementById("root").innerHTML = `
      <div style="color: ${error && 'red'}">
        ${isAuth ? 'Welcome back!' : error}
      </div>
    ` 
  }
}
new App() 