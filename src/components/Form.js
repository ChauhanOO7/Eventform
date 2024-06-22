import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required!!!';
    if (!formData.email) newErrors.email = 'Email is required!!!';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid!!!';
    if (!formData.age) newErrors.age = 'Age is required!!!';
    else if (isNaN(formData.age) || formData.age <= 0) newErrors.age = 'Age must be a number greater than 0!!!';
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) newErrors.guestName = 'Guest name is required!!!';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="form">
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.name && <span className="error">{errors.name}</span>}
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          {errors.email && <span className="error">{errors.email}</span>}
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          {errors.age && <span className="error">{errors.age}</span>}
          <label className='age'>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label>Are you attending with a guest?</label>
          <select className='choice' name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {formData.attendingWithGuest === 'Yes' && (
          <div className='guest'>
            {errors.guestName && <span className="error">{errors.guestName}</span>}
            <label>Guest Name:</label>
            <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
