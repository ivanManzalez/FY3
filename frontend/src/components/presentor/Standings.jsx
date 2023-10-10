import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";

// Child component
const Child = forwardRef((props, ref) => {
  const [childName, setChildName] = useState("Child name");

  const styles = {
    border: '1px solid rgba(3, 1, 5, 1)',
    backgroundColor: "green",
  };

  const printName = (name) => {
    console.log("The child's name: ", name);
  };

  // Expose the printName function via the ref
  useImperativeHandle(ref, () => ({
    printName,
  }));

  return (
    <div style={styles}>
      {/*<div>{childName("Ivan")}</div>*/}
      <button onClick={()=>{printName("Ivan")}}>Child Button</button>
    </div>
  );
});

// Parent component
const Standings = () => {
  const childRef = useRef();

  // Function to call the child's printName method
  const handleParentClick = (name) => {
    // console.log(childRef)
    childRef.current.printName(name);
  };

  return (
    <div>
      <h1>This is the Standings page</h1>
      <Child ref={childRef} />
      <button onClick={()=>{handleParentClick("Larry")}}>Parent Click</button>
    </div>
  );
};

export default Standings;
