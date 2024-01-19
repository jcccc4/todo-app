import React from 'react'

type Props = {
    children: React.ReactNode;
}

const Button = (props: Props) => {
  return (
    <button className='flex px-6 h-10 items-center border border-black rounded-full'>{props.children}</button>
  )
}

export default Button;