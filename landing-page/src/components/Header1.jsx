import React, { useState } from "react";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";

const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
];

const Header1 = () => {
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <header className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    Logo
                </div>
                {/* Navigation Menu */}
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="#home" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:underline">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="hover:underline">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};

export default Header1;
