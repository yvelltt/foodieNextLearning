'use client'
import { usePathname } from "next/navigation"
import Link from 'next/link';

import classes from './nav-link.module.css';

export default function NavLink({ href, children }) {
    const path = usePathname();
    return (
        <li>
            {/* children 就是 行內元素 */}
            <Link href={href} className={path.startsWith({ href }) ? `${classes.active}` : undefined}>{children}</Link>
        </li>
    )
}