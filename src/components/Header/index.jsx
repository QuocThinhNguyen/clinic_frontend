import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '~/context/UserContext';
import { FiMenu } from 'react-icons/fi';
import { FaRegAddressBook } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { IoMdKey } from 'react-icons/io';
import { axiosInstance } from '~/api/apiRequest';
function Header() {
    const [fullName, setFullName] = useState();

    const { user, logout } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        const fetchFullName = async () => {
            if (user.userId) {
                try {
                    const response = await axiosInstance.get(`/user/${user.userId}`);
                    if (response.status === 'OK') {
                        setFullName(response.data.fullname);
                    } else {
                        console.error('Failed to fetch data:', response.message);
                        setFullName([]);
                    }
                } catch (error) {
                    console.error('Error fetching appointments:', error);
                    setFullName([]);
                }
            }
        };
        fetchFullName();
    });

    return (
        <header className="bg-transparent shadow fixed top-0 left-0 right-0 z-50">
            <div className="absolute inset-0 backdrop-blur-md bg-white/30"></div>
            <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <NavLink to="/" className="flex-shrink-0 flex items-center mr-auto">
                        <span className="text-4xl font-bold">
                            <span className="text-green-500">Easy</span>
                            <span className="text-blue-500">Med</span>
                        </span>
                    </NavLink>

                    {/* Navigation */}
                    <nav className="hidden sm:ml-6 sm:flex sm:space-x-8 mr-32">
                        <NavLink
                            to="#"
                            className="inline-flex items-center px-1 pt-1 text-2xl font-bold text-gray-500 hover:text-gray-700"
                        >
                            Bệnh viện
                        </NavLink>
                        <NavLink
                            to="#"
                            className="inline-flex items-center px-1 pt-1 text-2xl font-bold text-gray-500 hover:text-gray-700"
                        >
                            Bác sĩ
                        </NavLink>
                        <NavLink
                            to="#"
                            className="inline-flex items-center px-1 pt-1 text-2xl font-bold text-gray-500 hover:text-gray-700"
                        >
                            Chuyên khoa
                        </NavLink>
                    </nav>

                    {/* Login Button */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {user && !user.auth ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xl text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Đăng nhập
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xl text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Đăng kí
                                </NavLink>
                            </>
                        ) : (
                            <div
                                className="relative inline-block text-left"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <div className="flex justify-center items-center cursor-pointer">
                                    <div>
                                        <img
                                            className="w-14 h-14 rounded-full"
                                            src="https://i.pinimg.com/736x/21/1a/6e/211a6e39c8db24b8cc967f3f0aeb8da0.jpg"
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-2xl font-bold">{fullName}</p>
                                    </div>
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute top-14 left-0 right-0 h-3 bg-transparent"></div>
                                )}
                                {isDropdownOpen && (
                                    <div
                                        className="absolute -right-6  bg-white mt-3 py-2 w-56 min-w-64 text-left rounded-xl border border-gray-200   shadow-[0_0_1px_0_rgba(0,0,0,0.04),0_2px_6px_0_rgba(0,0,0,0.04),0_10px_20px_0_rgba(0,0,0,0.04)]"
                                        onMouseEnter={() => setIsDropdownOpen(true)}
                                        onMouseLeave={() => setIsDropdownOpen(false)}
                                    >
                                        <ul className="py-1">
                                            <li className="group px-4 py-2 text-left text-2xl font-medium hover:bg-slate-100 cursor-pointer flex items-center">
                                                <NavLink
                                                    to="/user/profile"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? 'text-blue-500 flex items-center w-full'
                                                            : 'flex items-center w-full'
                                                    }
                                                >
                                                    <FaRegAddressBook className="mr-2 transform group-hover:animate-rotate-fast" />
                                                    Hồ sơ cá nhân
                                                </NavLink>
                                            </li>
                                            <li className="group px-4 py-2 text-left text-2xl font-medium hover:bg-slate-100 cursor-pointer flex items-center">
                                                <NavLink
                                                    to="/user/change-password"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? 'text-blue-500 flex items-center w-full'
                                                            : 'flex items-center w-full'
                                                    }
                                                >
                                                    <IoMdKey className="mr-2 transform group-hover:animate-rotate-fast" />
                                                    Đổi mật khẩu
                                                </NavLink>
                                            </li>
                                            <li
                                                className="group px-4 py-2 text-left text-2xl text-[#e74c3c] font-medium hover:bg-slate-100 cursor-pointer flex items-center"
                                                onClick={handleLogout}
                                            >
                                                <IoLogOutOutline className="mr-2 transform group-hover:animate-rotate-fast" />
                                                Đăng xuất
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            // <NavLink
                            //     className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            //     onClick={handleLogout}
                            // >
                            //     Logout
                            // </NavLink>
                        )}
                    </div>
                    <div className="p-5 flex items-center sm:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <FiMenu />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <NavLink
                            to="#"
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                        >
                            Bệnh viện
                        </NavLink>
                        <NavLink
                            to="#"
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                        >
                            Bác sĩ
                        </NavLink>
                        <NavLink
                            to="#"
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                        >
                            Chuyên khoa
                        </NavLink>
                    </div>
                    <div className="pb-3 border-t border-gray-200">
                        {user && !user.auth ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className="block px-4 py-2 text-base font-medium text-center text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Đăng nhập
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="block px-4 py-2 mt-2 text-base font-medium text-center text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Đăng kí
                                </NavLink>
                            </>
                        ) : (
                            <NavLink
                                className="block px-4 py-2 text-base font-medium text-center text-white bg-blue-600 hover:bg-blue-700"
                                onClick={handleLogout}
                            >
                                Logout
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
