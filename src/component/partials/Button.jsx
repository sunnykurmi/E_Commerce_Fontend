import React from 'react'

// Button component with customizable appearance and behavior
const Button = ({ text, type }) => {
  const buttonClasses = type === 'fill'
    ? "bg-[#344e41] text-white px-6 py-2 hover:opacity-80 duration-200"
    : "border-2 border-[#344e41] text-[#344e41] px-6 py-2 hover:bg-[#344e41] hover:text-white duration-200"

  return (
    <button className={buttonClasses}>
      {text}
    </button>
  )
}

export default Button
