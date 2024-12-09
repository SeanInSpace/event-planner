// src/components/Header/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as BookmarkIcon } from '../../assets/svgs/bookmark.svg';
import { ReactComponent as InboxIcon } from '../../assets/svgs/inbox.svg';
import { ReactComponent as MoonIcon } from '../../assets/svgs/moon.svg';
import { ReactComponent as GearIcon } from '../../assets/svgs/gear.svg';
import { ReactComponent as SunIcon } from '../../assets/svgs/sun.svg';
import { ReactComponent as Logo } from '../../assets/svgs/logo.svg';

const Header = ({ toggleDarkMode, isDarkMode, user, handleSignIn }) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <Logo className={styles.logo} title="Logo" />
        {user ? (
          <>
            <img src={user.imageUrl} alt="User" className={styles.userImage} />
            <p>{user.name}</p>
          </>
        ) : (
          <button className={styles.signInBtn} onClick={handleSignIn}>
            Sign in with Google
          </button>
        )}
      </div>

      <nav className={styles.centerSection}>
        <ul className={styles.navLinks}>
          {[
            { path: "/", label: "My Events" },
            { path: "/dashboard", label: "Dashboard" },
            { path: "/weekly-schedule", label: "Weekly Schedule" },
            { path: "/create-event", label: "Create Event" },
            { path: "/resources", label: "Resources" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.rightSection}>
        <BookmarkIcon className={styles.icon} title="Saved Events" />
        <InboxIcon className={styles.icon} title="Inbox" />
        <GearIcon className={styles.icon} title="Settings" />

        <button onClick={toggleDarkMode} className={styles.themeBtn}>
          {isDarkMode ? (
            <SunIcon className={styles.icon} title="Switch to Light Mode" />
          ) : (
            <MoonIcon className={styles.icon} title="Switch to Dark Mode" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
