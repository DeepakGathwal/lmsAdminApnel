import React, { useState } from 'react';

function FormFilterdateandmonth({ handelChange, allData }) {
  const [dateType, setDateType] = useState('byDate');

  const handleDateTypeChange = (e) => {
    setDateType(e.target.value);
  };

  return (
    <>
      <div className='form_filter'>
        <div>
          <input type='radio' id='byDate' name='dateType' value='byDate' checked={dateType === 'byDate'} onChange={handleDateTypeChange} />
          <label htmlFor='byDate'>By Date</label>
          </div><div>
          <input type='radio' id='byMonth' name='dateType' value='byMonth' checked={dateType === 'byMonth'} onChange={handleDateTypeChange} />
          <label htmlFor='byMonth'>By Month</label>
        </div>

        <div className={dateType === 'byDate' ? '' : 'hidden'}>
            <div className='d-flex align-items-center'>
            <label htmlFor="fromDate"><strong>From:</strong></label>
            <input type='date' name='startDate' onChange={handelChange} />
            <label htmlFor="toDate"><strong>To:</strong></label>
            <input type='date' name='endDate' onChange={handelChange} />
            </div>
          </div>
        <div className={dateType === 'byMonth' ? '' : 'hidden'}>
          <div>
            <label htmlFor="month"><strong>Select Month:</strong></label>
            <input type='month' name='month' onChange={handelChange} />
          </div>
        </div>
        <button className='btn-create' type='button' onClick={allData}>Save</button>
      </div>
    </>
  );
}

export default FormFilterdateandmonth;
