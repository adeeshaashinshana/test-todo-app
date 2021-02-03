import React from 'react';
import './App.css';
import FlipMove from 'react-flip-move';

function ListItem(props){

    const items = props.items;
    
    const listItems = items.map(item =>{
        return (

            <div className="list" key={item.key}>

                <div class="ui four column divided grid">
                    <div class="row">

                        <div class="one wide column">
                            <p> <center>
                                <span className="Check-span">
                                    <i class="disabled check circle outline icon">
                                    </i>
                                </span>
                            </center> </p>
                        </div>

                        <div class="thirteen wide column">
                            <p>
                                <input type = "text"
                                    id = {item.key}
                                    value = {item.text}
                                    onChange={
                                        (updateItem) => {
                                            props.setUpdate(updateItem.target.value, item.key)
                                        }
                                    }> 
                                </input>
                            </p>
                        </div>

                        <div class="one wide column">  
                            <p>
                                <span className="Edit-Span">
                                    <center>
                                        <i class="red trash alternate outline icon"
                                            onClick={ () => props.deleteItem(item.key)}>
                                        </i>
                                    </center>
                                </span>
                            </p> 
                        </div> 
                        
                        <div class="one wide column">
                            <p>
                                <span className="Edit-Span">
                                    <i class="blue edit outline icon">
                                    </i>
                                </span>
                            </p>
                        </div>  
                    </div>
                </div>
            </div>);
        })

    return(
        <div>
            <FlipMove duration = {400} easing = "ease-in-out">
                {listItems}
            </FlipMove>
        </div>
    )
}

export default ListItem;