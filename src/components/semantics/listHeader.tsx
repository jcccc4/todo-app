import React from "react";

import AuthButtons from "../buttons/authButtons";

type Props = {
  listName: string;
};

const ListHeader = (props: Props) => {
  return (
    <header className="h-20 px-10 flex items-center justify-between">
      <h1>{props.listName}</h1>
      <AuthButtons />
    </header>
  );
};

export default ListHeader;
