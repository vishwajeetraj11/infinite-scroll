import React, { useState, useEffect } from 'react';
// Components
import User from './User';
// Styles
import { Content, Loading } from './App.styles';
// API
import { getUsers } from './API';

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(page)
  const handleScroll = event => {
    let {scrollTop, clientHeight, scrollHeight} = event.currentTarget
    // console.log(scrollTop-scrollHeight === clientHeight)
    // console.log(Math.floor(scrollTop),scrollHeight,clientHeight)

    if(scrollHeight - Math.floor(scrollTop) === clientHeight){
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      const newUsers = await getUsers(page)
      setUsers(prev => [...prev, ...newUsers])
      setLoading(false);
    }

    loadUsers();
  }, [page])

  return (
    <div className='App'>
      <Content onScroll={handleScroll}>
        {users && users.map(user => <User key={user.cell} user={user} />)}
      </Content>
      {loading && <Loading>Loading ...</Loading>}
    </div>
  );
}

export default App;
