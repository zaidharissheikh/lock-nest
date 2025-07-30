import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center h-16 bg-gradient-to-r from-gray-950 via-neutral-950 to-black text-gray-100 border-none gap-2'>
      <div className='font-extrabold text-xl tracking-wide flex items-center pt-1'>
            <span className='text-cyan-400'>&lt;</span>
            Lock
            <span className='text-cyan-400'>Nest/&gt;</span>
      </div>
      <p className='text-sm'>Created with 
        <span className='mx-1'>
          <lord-icon
            src="https://cdn.lordicon.com/nvsfzbop.json"
            trigger="hover"
            colors="primary:#c71f16,secondary:#e83a30"
            style={{width: '25px', height: '25px', paddingTop: '7px'}}>
          </lord-icon>
        </span> by Zaid Haris.</p>
    </div>
  )
}

export default Footer