import React, { useState } from 'react';
import Auth from '../../utils/auth';
import './../../styles/Profile.css';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../../utils/queries';
import { ADD_INTEREST } from '../../utils/mutations';


export default function Profile() {

    const token = Auth.loggedIn() ? Auth.getProfile(Auth.getToken()) : null;
    const userId = token.data._id;

    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: {userId: userId}
    })

    const [addInterest, { error }] = useMutation(ADD_INTEREST);

    const user = data?.user || {};

    const [interestValue, setInterestValue] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInterestValue(value)
    }

    const handleAddInterest = async () => {
        if(!interestValue) return;

        try {
            const data = await addInterest({
                variables: { userId: userId, interest: interestValue }
            })

            setInterestValue('');
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(user)
    return (
    <div className='userHome' >
        <aside className='asideBar'>
         <h3>Interests</h3>
          <ul>
           {user.interests.map((interest) => (
                <li>{interest}</li>
            ))}
          
            </ul>
         <button className='interestButton' onClick={handleAddInterest}>+</button>
         <input
            className=''
            name='interest'
            placeholder='New Interest'
            value={interestValue}
            type='text'
            onChange={handleChange}
            />
        </aside>
        <section className='section1'>
            <section className='main'>
             <div>
              <img src="" alt="User Profile"   className=""/>
              <button className='picButton'>+</button>
             </div>
             <div>
              <h4> {user.name}'s bio </h4>
              <button className='bioButton'>+</button>
             </div>
            </section>
        </section>
        <section className='section2'>
            <h3>Completed Projects </h3>
            <ul>
                <li>Visual test 1</li>
                <li>Visual test 2</li>
                <li>Visual test 3</li>
            </ul>
        </section>
    </div>
  );

}
