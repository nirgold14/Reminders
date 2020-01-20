import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import RemindersList from './Components/RemindersList/ReminderList';
import CreateReminder from './Components/CreateReminder/CreateReminder';
import EditReminder from './Components/EditReminder/EditReminder';
import { Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse, Nav } from 'reactstrap';

function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="App">
     <Router>
       <div className="container">
         <Navbar color="light" light expand="md">
           <NavbarBrand>Always Remember... </NavbarBrand>
           <NavbarToggler onClick={toggle}/>
           <Collapse isOpen={isOpen} navbar>
             <Nav className="mr-auto">
                <NavItem >
                  <Link to={'/CreateReminder'} className="nav-link">New Reminder</Link>
                </NavItem>
                <NavItem>
                <Link to={'/RemindersList'} className="nav-link">Show Reminders</Link>
                </NavItem>
             </Nav>
           </Collapse>
         </Navbar>
         <Switch>
           <Route path='/CreateReminder' component={CreateReminder}/>
           <Route path='/EditReminder/:id' component={EditReminder}/>
           <Route path='/RemindersList' component={RemindersList}/>
         </Switch>
       </div>
     </Router>
    </div>
  );
}

export default App;
