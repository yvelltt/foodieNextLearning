import Link from 'next/link';
import Image from 'next/image';

import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import NavLink from '../nav-link/nav-link';

export default function MainHeaderPage() {
    return (
        <header className={classes.header}>
            <Link className={classes.logo} href="/">
                <Image src={logoImg.src} alt='NextLevel Logo' priority width={200} height={200} />
                NextLevel Logo
            </Link>
            <nav className={classes.nav}>
                <ul>
                    <NavLink href="/meals">Browser Meals</NavLink>
                    <NavLink href="/community">Foodie Community</NavLink>
                </ul>
            </nav>
        </header>
    );
}