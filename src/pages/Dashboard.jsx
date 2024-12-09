// src/components/Dashboard/Dashboard.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as GearIcon } from '../assets/svgs/gear.svg';
import { ReactComponent as ClockIcon } from '../assets/svgs/clock.svg';
import { ReactComponent as PrinterIcon } from '../assets/svgs/printer.svg';
import { ReactComponent as FilterIcon } from '../assets/svgs/filter.svg';
import EventList from '../components/EventList/EventList';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Section */}
      <aside className={styles.sidebar}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Upcoming Events</h1>
          <div className={styles.iconRow}>
            <ClockIcon className={styles.icon} title="Clock" />
            <PrinterIcon className={styles.icon} title="Print" />
            <FilterIcon className={styles.icon} title="Filter" />
            <GearIcon className={styles.icon} title="Settings" />
          </div>
        </div>
        {/* Filters Section
        <div className={styles.filterChips}>
          <button className={`${styles.chip} ${styles.activeChip}`}>Label</button>
          <button className={styles.chip}>Label</button>
          <button className={styles.chip}>Label</button>
          <button className={styles.chip}>Label</button>
        </div>*/}
        <section className={styles.upcomingEventsSection}>
          <div className={styles.eventsHeader}>
            <Link to="/" className={styles.viewAllLink}>
              View All
            </Link>
          </div>
          <EventList />
        </section>
      </aside>


      {/* Main Content Section */}
      <main className={styles.mainContent}>
        <section className={styles.calendarSection}>
          <div className={styles.header}>
            <h3>Calendar</h3>
            <div className={styles.headerButtons}>
              <Link to="/create-event" className={styles.createBtn}>
                + Create Event
              </Link>
              <button className={styles.settingsBtn}>
                <GearIcon className={styles.gearIcon} title="Settings" />
              </button>
            </div>
          </div>
          <div className={styles.calendar}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              calendarClassName={styles.largeCalendar}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
