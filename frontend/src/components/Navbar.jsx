import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "All Books",
            link: "/all-books"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        },
        {
            title: "Admin Profile",
            link: "/profile"
        }
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    if (isLoggedIn === false) {
        links.splice(2, 3);
    }
    if (isLoggedIn === true && role === "user") {
        links.splice(4, 1);
    }
    if (isLoggedIn === true && role === "admin") {
        links.splice(2, 2);
    }

    const [mobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className='z-50 relative bg-zinc-800 text-white px-8 py-5 flex items-center justify-between'>
                <Link to="/" className='flex items-center'>
                    <img className='h-10 me-4'
                        src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='logo' />
                    <h1 className='text-2xl font-semibold'>BookHeaven</h1>
                </Link>
                <div className='flex items-center gap-4'>

                    <div className='hidden md:flex gap-4'>
                        {links.map((items, i) => (
                            <div className='flex items-center justify-center' key={i}>
                                {items.title === "Profile" || items.title === "Admin Profile" ? (
                                    <Link to={items.link}
                                        className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
                                        {items.title}
                                    </Link>
                                ) : (
                                    <Link to={items.link}
                                        className='hover:text-blue-500 transition-all duration-300'>
                                        {items.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className='hidden md:flex gap-4'>
                        {isLoggedIn === false && (
                            <>
                                <Link to="/login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
                                <Link to="/signup" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
                            </>
                        )}
                    </div>
                    <button className='md:hidden block text-white text-2xl hover:text-zinc-400' onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}>
                        <IoMenu />
                    </button>
                </div>
            </nav>
            <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link to={items.link}
                        className={`${mobileNav} text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`}
                        key={i}
                        onClick={() => setMobileNav("hidden")}>
                        {items.title}
                    </Link>
                ))}
                {isLoggedIn === false && (
                    <>
                        <Link to="/login" className={`${mobileNav} mb-8 text-3xl font-semibold px-8 py-2 border border-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>LogIn</Link>
                        <Link to="/signup" className={`${mobileNav} mb-8 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
                    </>
                )}
            </div>
        </>
    )
}

export default Navbar;
