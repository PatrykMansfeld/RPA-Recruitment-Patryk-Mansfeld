'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Display Reports' },
  { href: '/create', label: 'Create Report' },
];

const Navigation: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow-md mb-8">
            <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-center space-x-4">
                {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-md transition-colors ${
                    pathname === item.href 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {item.label}
                </Link>
                ))}
            </div>
            </div>
        </nav>
    );
};

export default Navigation;