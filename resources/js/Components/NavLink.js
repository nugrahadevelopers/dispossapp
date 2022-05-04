import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? "inline-flex items-center text-lg font-semibold text-orange-400 focus:outline-none transition duration-150 ease-in-out"
                    : "inline-flex items-center text-lg font-semibold text-white hover:text-orange-400 focus:outline-none transition duration-150 ease-in-out"
            }
        >
            {children}
        </Link>
    );
}
