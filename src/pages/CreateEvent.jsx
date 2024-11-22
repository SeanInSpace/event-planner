// src/pages/CreateEvent.jsx
import React, { useState } from 'react';
import styles from './CreateEvent.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateEvent = () => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    name: '',
    type: '',
    customType: '',
    description: '',
    coverImage: null,
    startDate: new Date(),
    endDate: new Date(),
    venueAddress: '',
    isOnline: false,
    onlineLink: '',
    locationNote: '',
    guestCount: 0,
    rsvp: false,
    dietaryRestrictions: '',
    guestList: [],
    budget: 0,
    categories: ['Venue', 'Catering', 'Decorations'],
    budgetSummary: {},
    tasks: ['Book venue', 'Hire photographer'],
    customTasks: [],
    vendors: [],
    customVendors: [],
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setEventData({ ...eventData, [name]: checked });
    } else if (type === 'file') {
      setEventData({ ...eventData, [name]: files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleDescriptionChange = (value) => {
    setEventData({ ...eventData, description: value });
  };

  const handleDateChange = (name, date) => {
    setEventData({ ...eventData, [name]: date });
  };

  const handleCategoryAdd = () => {
    setEventData({
      ...eventData,
      categories: [...eventData.categories, ''],
    });
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = [...eventData.categories];
    newCategories[index] = value;
    setEventData({ ...eventData, categories: newCategories });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(eventData);
    alert('Event Created Successfully!');
  };

  return (
    <div className={styles.createEventContainer}>
      <div className={styles.formContainer}>
        {step === 1 && (
          <div className={styles.step}>
            <h2>Step 1: Event Basics</h2>
            <label>
              Event Name:
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </label>
            <label>
              Event Type:
              <select name="type" value={eventData.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Conference">Conference</option>
                <option value="Party">Party</option>
                <option value="Custom">Custom</option>
              </select>
            </label>
            {eventData.type === 'Custom' && (
              <label>
                Custom Type:
                <input
                  type="text"
                  name="customType"
                  value={eventData.customType}
                  onChange={handleChange}
                  required
                />
              </label>
            )}
            <label>
              Description:
              <ReactQuill
                value={eventData.description}
                onChange={handleDescriptionChange}
                modules={CreateEvent.modules}
                formats={CreateEvent.formats}
              />
            </label>
            <label>
              Event Cover Image:
              <input
                type="file"
                name="coverImage"
                accept="image/png, image/jpeg"
                onChange={handleChange}
              />
            </label>
            <div className={styles.navigationButtons}>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={styles.step}>
            <h2>Step 2: Date and Location</h2>
            <label>
              Start Date and Time:
              <DatePicker
                selected={eventData.startDate}
                onChange={(date) => handleDateChange('startDate', date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </label>
            <label>
              End Date and Time:
              <DatePicker
                selected={eventData.endDate}
                onChange={(date) => handleDateChange('endDate', date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </label>
            <label>
              Venue Address:
              <input
                type="text"
                name="venueAddress"
                value={eventData.venueAddress}
                onChange={handleChange}
                placeholder="Enter venue address"
                required
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="isOnline"
                checked={eventData.isOnline}
                onChange={handleChange}
              />
              Online Event
            </label>
            {eventData.isOnline && (
              <label>
                Online Link:
                <input
                  type="url"
                  name="onlineLink"
                  value={eventData.onlineLink}
                  onChange={handleChange}
                  placeholder="Enter online event link"
                  required
                />
              </label>
            )}
            <label>
              Location Note:
              <input
                type="text"
                name="locationNote"
                value={eventData.locationNote}
                onChange={handleChange}
                placeholder="Parking or access instructions"
              />
            </label>
            <div className={styles.navigationButtons}>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={styles.step}>
            <h2>Step 3: Guests</h2>
            <label>
              Guest Count Estimate:
              <input
                type="number"
                name="guestCount"
                value={eventData.guestCount}
                onChange={handleChange}
                min="0"
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="rsvp"
                checked={eventData.rsvp}
                onChange={handleChange}
              />
              Enable RSVP
            </label>
            {eventData.rsvp && (
              <div>
                <label>
                  Dietary Restrictions:
                  <input
                    type="text"
                    name="dietaryRestrictions"
                    value={eventData.dietaryRestrictions}
                    onChange={handleChange}
                    placeholder="e.g., Vegetarian, Gluten-Free"
                  />
                </label>
                {/* Add more RSVP-related fields as needed */}
              </div>
            )}
            <label>
              Import Guest List (CSV):
              <input
                type="file"
                name="guestList"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Implement CSV parsing if needed
                    alert(`Guest list "${file.name}" uploaded!`);
                  }
                }}
              />
            </label>
            {/* Option to add guests manually can be implemented here */}
            <div className={styles.navigationButtons}>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className={styles.step}>
            <h2>Step 4: Budget</h2>
            <label>
              Total Budget:
              <input
                type="number"
                name="budget"
                value={eventData.budget}
                onChange={handleChange}
                min="0"
              />
            </label>
            <div className={styles.categories}>
              <h4>Categories:</h4>
              {eventData.categories.map((category, index) => (
                <input
                  key={index}
                  type="text"
                  value={category}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                  placeholder={`Category ${index + 1}`}
                  required
                />
              ))}
              <button onClick={handleCategoryAdd}>+ Add Category</button>
            </div>
            <div className={styles.navigationButtons}>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className={styles.step}>
            <h2>Step 5: Tasks and Vendors</h2>
            <div className={styles.tasks}>
              <h4>Tasks:</h4>
              <ul>
                {eventData.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
              {/* Option to add custom tasks can be implemented here */}
            </div>
            <div className={styles.vendors}>
              <h4>Vendors:</h4>
              {/* Implement vendor selection or addition */}
            </div>
            <div className={styles.navigationButtons}>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
        {step === 6 && (
          <div className={styles.step}>
            <h2>Step 6: Review and Finalize</h2>
            <div className={styles.review}>
              <h3>Event Summary</h3>
              <p><strong>Name:</strong> {eventData.name}</p>
              <p><strong>Type:</strong> {eventData.type === 'Custom' ? eventData.customType : eventData.type}</p>
              <p><strong>Description:</strong></p>
              <div dangerouslySetInnerHTML={{ __html: eventData.description }} />
              <p><strong>Start:</strong> {eventData.startDate.toString()}</p>
              <p><strong>End:</strong> {eventData.endDate.toString()}</p>
              <p><strong>Venue Address:</strong> {eventData.venueAddress}</p>
              {eventData.isOnline && <p><strong>Online Link:</strong> {eventData.onlineLink}</p>}
              <p><strong>Guest Count:</strong> {eventData.guestCount}</p>
              <p><strong>Budget:</strong> ${eventData.budget}</p>
              {/* Add more summary fields as needed */}
            </div>
            <div className={styles.navigationButtons}>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleSubmit}>Finalize and Create Event</button>
            </div>
          </div>
        )}
      </div>
      <aside className={styles.summarySidebar}>
        <h3>Real-Time Summary</h3>
        <p><strong>Event Name:</strong> {eventData.name}</p>
        <p><strong>Date/Time:</strong> {eventData.startDate.toString()} - {eventData.endDate.toString()}</p>
        <p><strong>Location:</strong> {eventData.isOnline ? 'Online Event' : eventData.venueAddress}</p>
        <p><strong>Guest Count:</strong> {eventData.guestCount}</p>
        <p><strong>Budget:</strong> ${eventData.budget}</p>
        <p><strong>Tasks Remaining:</strong> {eventData.tasks.length}</p>
        <button onClick={() => window.print()}>Print Summary</button>
      </aside>
    </div>
  );
};

// Quill modules and formats
CreateEvent.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
};

CreateEvent.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image'
];

export default CreateEvent;
