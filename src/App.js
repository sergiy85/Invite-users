import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// 1. get users
// 2. передать юзеров в компоненту User
// 3. Add isLoading (for render sceletons befor users)
// 4. Hidden loading sceletons: React.useEffect --> (.finally(() => setLoading(false));)
// 5. Path data to User component (first_name, last_name, email, avatar)
// 6. Create Search (set searchValue and setSearchValue)
// 7. Press "+" to add user for invite (by user id)
//   7.1 set invites
//   7.2 in User component: <User isInvited = {invites.includes(user.id)} /> - check if the user is in the "invites" array
// 8. Press btn "Send Invite" and show <Success />
// 9. hide button "Send invite" until at least one user is selected

const API_URL = 'https://reqres.in/api/users'; 

const App = () => {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [invites, setInvites] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  const onClickSendInvites = () =>{
    setSuccess(true);
  }

  const onClickInvite = (id) => {
    if(invites.includes(id)){
      setInvites(prev => prev.filter(_id => _id !== id)); // if the id matches, then we remove the user from the array.
                                                          // If they don't match, we leave them in the array
    }else{
      setInvites(prev => [...prev, id]); // if the user isn't in the array at all, then we will add him there
    }
  };
  
  const onChangeSearchValue = (event)=>{
    setSearchValue(event.target.value);
  };

  React.useEffect(() =>{
    fetch(API_URL)
      .then(response => response.json())
      .then(respJson => setUsers(respJson.data))
      .catch(error => console.warn(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      {
        success ? (
          <Success count={invites.length} />
        ) : (
        <Users 
          items={users} 
          isLoading={isLoading}
          searchValue = {searchValue}
          onChangeSearchValue={onChangeSearchValue}
          onClickInvite = {onClickInvite}
          invites = {invites}
          onClickSendInvites = {onClickSendInvites}
        />
        )
      }
    </div>
  );
}

export default App;
