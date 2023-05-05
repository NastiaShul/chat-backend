import React from 'react'

export const Close = ({ onClick }) => {
   return (
      <svg onClick={onClick} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1.49983 1.49968L10.5002 10.5M1.49983 10.5L10.5002 1.49968" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
   )
}