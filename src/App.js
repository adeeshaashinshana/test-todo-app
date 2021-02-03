import React from 'react';
import './App.css';
import ListItem from './ListItem';


class App extends React.Component{
  constructor(props){
      super(props);

      // Store the task in the array
      this.state={
          items: [],
          currentItem: {
              text: '',
              key: ''
          }
      }

      /* handleInput(), addItem(), deleteItem(), setUpdate()  methods have lost its contex therefore its 'this' keyword doesn't point to the class automaticaly
      therefore 'this' keyword should bind to the constructor manually*/
      this.handleInput = this.handleInput.bind(this);
      this.addItem = this.addItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.setUpdate = this.setUpdate.bind(this);
  }

      

  // -------------------------------------- functon for get data from the input section ----------------------------------
  handleInput(taskInput){

      // for the update the variable data
      this.setState({
          currentItem:{
              text: taskInput.target.value,   //get current text from input
              key: Date.now()                 //get current date via input (bcoz key must be unique)
          }
      })
  }



  // --------------------------------------- function for 'Add task' button ----------------------------------------------
  addItem(taskInput){

    //stop the refresh the page when click the 'Add Task' button
    taskInput.preventDefault();


    const newItem = this.state.currentItem;    
    console.log(newItem);

    if(newItem.text !== ""){

      // for assign value new value with previous values
      const newItems = [...this.state.items, newItem];  

      this.setState({
        items: newItems,
        currentItem: {
          text: '',
          key: ''
        }
      }
    )}

  }





  // ------------------------------------ function for 'trash' icon ----------------------------------------------------
  deleteItem(key){
    const filteredItems = this.state.items.filter(item => item.key!==key);
    this.setState({
      items: filteredItems
    })
  }





  // ------------------------------------- function for 'edit' icon ----------------------------------------------------
  setUpdate(text, key){
    const items = this.state.items;
    items.map(item => {
      if(item.key===key){
        item.text=text;
      }
    })
    this.setState({
      items: items
    })
  }



  // ------------------------------------- return finction -------------------------------------------------------------
  render(){
      return(

        <div className="App">
        
        {/* ------------------- start header design ----------------------- */}
        <header className="App-header">
        <h2 class="ui center aligned icon header">
          <i class="circular tasks icon"></i>
          Do everything what do you want without miss
        </h2>
        </header>
        {/* ------------------- end header design ----------------------- */}
        
        
        <div className="App-body">
          <div class="ui container center" style={{padding:"15px"}}> 

            {/* ------------------- start task add section ----------------------- */}
            <form class="ui form" onSubmit={this.addItem}>
              <div class="ui input focus">
                <input type="text" placeholder="Enter new task"
                  value={this.state.currentItem.text} 
                  onChange={this.handleInput}/>
              </div>
              <button class="ui primary button"> Add Task </button>
            </form>
            {/* ------------------- end task add section ----------------------- */}


            {/* ------------------- start task list section ----------------------- */}
            <ListItem items={this.state.items}
              deleteItem = {this.deleteItem}
              setUpdate = {this.setUpdate}> </ListItem>
            {/* ------------------- end task list section ----------------------- */}
          </div>
        </div>
      </div>
      );
  };
}



export default App;
