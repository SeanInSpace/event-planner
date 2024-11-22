// src/components/Header/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as BookmarkIcon } from '../../assets/svgs/bookmark.svg';
import { ReactComponent as InboxIcon } from '../../assets/svgs/inbox.svg';
import { ReactComponent as MoonIcon } from '../../assets/svgs/moon.svg';
import { ReactComponent as GearIcon } from '../../assets/svgs/gear.svg';

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <button className={styles.signInBtn}>Sign in</button>
        <button className={styles.registerBtn}>Register</button>
      </div>
      <nav className={styles.centerSection}>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              My Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/weekly-schedule"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Weekly Schedule
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-event"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Create Event
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.rightSection}>
        <BookmarkIcon className={styles.icon} title="Saved Events" />
        <InboxIcon className={styles.icon} title="Inbox" />
        <GearIcon className={styles.icon} title="Settings" />
        <button onClick={toggleDarkMode} className={styles.themeBtn}>
          <MoonIcon className={`${styles.icon} ${isDarkMode ? styles.active : ''}`} title="Toggle Dark Mode" />
        </button>
      </div>
    </header>
  );
};

export default Header;
