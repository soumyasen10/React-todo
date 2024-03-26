import React from 'react'

function Footer() {
  return (
    <footer className='bg-gray-900 container mx-auto py-10 text-center text-sm text-teal-600 border-dashed border-teal-900 border-t'>
      <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved</p>
    </footer>
  )
}

export default Footer