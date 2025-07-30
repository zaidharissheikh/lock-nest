import React from 'react'

const Navbar = () => {
return (
    <div className='flex justify-around items-center px-6 py-3 bg-gradient-to-r from-gray-950 via-neutral-950 to-slate-950 text-gray-100 shadow-lg h-16'>
        <div className='font-extrabold text-2xl tracking-wide flex items-center'>
            <span className='text-cyan-400'>&lt;</span>
            Lock
            <span className='text-cyan-400'>Nest/&gt;</span>
        </div>
        <nav className='flex items-center space-x-6'>
            <div className='flex items-center space-x-2 hover:cursor-pointer'>
                <lord-icon
                    src="https://cdn.lordicon.com/jjxzcivr.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: "40px", height: "40px" }}
                ></lord-icon><span className='text-white hover:text-violet-500 transition-colors duration-200'>GitHub</span>
            </div>
        </nav>
    </div>
)
}

export default Navbar
