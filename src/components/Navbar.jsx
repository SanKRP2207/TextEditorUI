import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

function Navbar() {
    const { token, signout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignout = async () => {
        await signout();
        navigate('/signin');
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to="/" className="text-xl font-bold">Editor</Link>
                    </div>
                    <div className="flex space-x-4">
                        {token ? (
                            <button onClick={handleSignout} className="hover:text-gray-300">Sign Out</button>
                        ) : (
                            <Link to="/signin" className="hover:text-gray-300">Sign Out</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
