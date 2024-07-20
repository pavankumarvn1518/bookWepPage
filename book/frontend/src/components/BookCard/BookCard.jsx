import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({ data }) => {
  console.log(data);
  return(
  <> 
<Link>
<div className='bg-zinc-800 rounded p-4'>
   <div className='bg-zinc-900'>
    <img  src={data.url} alt="/"/>
   </div>
</div>
</Link>
 
  </>

)};

export default BookCard
