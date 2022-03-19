import React from "react";

// import classNames from "classnames";

export default function Button(props) {
   
  // will add a className attr when we decide on styles for button  
   
   return (
      <button onClick={props.onClick}>{props.children}</button>
   );
}