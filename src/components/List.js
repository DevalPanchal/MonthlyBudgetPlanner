import React from 'react';

export function List(props) {

     return (
          <div className={ props.inputsList.length > 0 ? "list-container" : "" }>
               <ul className="list-box">
               {
                    props.inputsList.map((item, index) => (
                         <li className="list-item" key={index} >
                              <span className="delete-button" onClick={() => {
                                  props.removeTodo(item);
                              }}>&#10005;</span>
                              <div className="item-wrapper">
                                   <h3 className="item" id="expense-item">{ item.type }</h3>
                                   <h3 className="item" id="expense-amount">$ { item.amount }</h3>
                              </div>
                         </li>
                    ))
               }
               </ul>
          </div>
     )
}
