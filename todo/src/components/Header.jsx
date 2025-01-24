import React from 'react';
import {memo} from 'react';

function Header() {
  return (
    <div className='header'>
      <h1 className='title'><span className='date-text'>📅 Today is..</span><span className='date'>{new Date().toDateString()}</span></h1>
    </div>
  )
}

const memoizedHeader=memo(Header);
export default memoizedHeader;