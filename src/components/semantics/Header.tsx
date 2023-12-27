import React from "react";

import AuthButtons from "@/components/buttons/AuthButtons";

type Props = {
  listName: string;
};

const Header = (props: Props) => {
  return (
    <header className="h-20 px-10 flex items-center justify-between">
      <h1>{props.listName}</h1>
      <AuthButtons />
    </header>
  );
};

export default Header;
