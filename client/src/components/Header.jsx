import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="bg-slate-200">
        <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
            <Link to='/'>
            <h1 className="font-bold">Hospital Management</h1>
            </Link>
            <ul className='flex gap-7'>
                <Link to='/'>
                <li>Home</li>
                </Link>
                <Link to='/about'>
                <li>About</li>
                </Link>
                <Link to='/login'>
                <li>Login</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}
