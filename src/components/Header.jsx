import React from 'react'
import {useLocation} from 'react-router-dom'
import FullscreenButton from './FullscreenButton';
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Header = () => {
  let location = useLocation();
  console.log(location);
  let breadcrumb = location.pathname;
  let pages = breadcrumb.split('/');
  let page = pages[pages.length -1];
  const headers = [["dashboard", "dashboard"], ["doctorUI", "doctors"], ["doctorOnBoarding", "doctor on boarding"], ["staffDisplay", "staff"], ["reception", "reception"], ["wardsDisplay", "wards"], ["wardsDetails", "ward details"] , ["home", "home"] , ["doctorOnboarding", "Staff on Boarding"]]
  const check_name = new Map(headers);
  let header_name = check_name.get(page) || "";
  return (
    <div className='flex flex-row items-center justify-between px-10 py-2'>
     <div className='text-xl font-medium'>{capitalizeFirstLetter(header_name)}</div>
      <FullscreenButton/>
    </div>
  )
}

export default Header