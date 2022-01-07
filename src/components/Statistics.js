import React from 'react';

export function Statistics(props) {
     return (
          <div className="statistic-box">
               <h2>{ props.title }</h2>
               <h3>$ { props.amount }</h3>
          </div>
     )
}
