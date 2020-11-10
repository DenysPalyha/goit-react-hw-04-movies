import React from 'react';
import {Link} from 'react-router-dom';
import imegasNotFound from '../images/banner_error_404.jpg';


const NotFound = () =>{
   return(
      <div>
         <img src={imegasNotFound} alt="imagas not found"/>
         <p>
            <Link to="/">Page not found. Link to home page</Link>
         </p>
      </div>
   )
}

export default NotFound;