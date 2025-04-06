import React from 'react';
import { Link} from 'react-router-dom';


const Navigation = (props) => {
  if(props.user === "admin"){
  return (

<nav className='nav'>
<Link to = "/admin/home" className='site-title'>Jury Selection</Link>

<ul>
<Link to = "/admin/home">Home</Link>
<Link to = "/admin/cases">Cases</Link>
<Link to = "/admin/courts">Courts</Link>
<Link to = "/"><button className='logout-button'>Logout</button></Link>
</ul>

</nav>
  )
}
else{
  if(props.user === "user"){
    return(
  <nav className='nav'>
<Link to = "/user" className='site-title'>Jury Selection</Link>

<ul>
<Link to = "/user">Home</Link>
<Link to = "/user/juryinvitations">Jury Invitations</Link>
<Link to = "/"><button className='logout-button'>Logout</button></Link>
</ul>

</nav>
  )}
else{return(<></>)};
}

};

export default Navigation;