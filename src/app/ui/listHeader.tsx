import React from "react";
import Button from "./button";

type Props = {
  listName: string;
};

const ListHeader = (props: Props) => {
  
    const signOut = () => {
        console.log("sign out")
    }
    return (
    <header className="h-20 px-10 flex items-center justify-between">
      <h1>{props.listName}</h1>
      <Button >SIGN OUT</Button>
    </header>
  );
};

export default ListHeader;
