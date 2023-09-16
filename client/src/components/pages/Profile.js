import React, { useState } from 'react';
import Auth from '../../utils/auth';
import './../../styles/Profile.css';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_INTERESTS } from '../../utils/queries';
import { ADD_INTEREST } from '../../utils/mutations';


export default function Profile() {

    const token = Auth.loggedIn() ? Auth.getProfile(Auth.getToken()) : null;
    const userId = token.data._id;

    const { loading: loadingUser, data: userData } = useQuery(QUERY_SINGLE_USER, {
        variables: {userId: userId}
    })

    const user = userData?.user || {};

    const { loading: loadingInterests, data: interestData } = useQuery(QUERY_INTERESTS);

    const interests = interestData?.interests || [];

    const [addInterest, { error }] = useMutation(ADD_INTEREST);

    const [interestValue, setInterestValue] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(document.querySelector('#interestSelect').value)

        setInterestValue(value)
    }

    const handleAddInterest = async () => {
        const selectedInterest = document.querySelector('#interestSelect').value;
        if(!selectedInterest) return;

        try {
            const data = await addInterest({
                variables: { userId: userId, interest: selectedInterest }
            })

            setInterestValue('');
        } catch (error) {
            console.error(error);
        }
    }

    if (loadingUser) {
        return <div>Loading...</div>
    }

    if (loadingInterests) {
        return <div>Loading...</div>
    }

    // console.log(interests[0].name)
    return (
    <div className='userHome' >
        <aside className='asideBar'>
         <h3>Interests</h3>
          <ul>
           {user.interests.map((interest) => (
            // console.log(interest.name)
                <li key={interest._id}>{interest.name}</li>
            ))}
          
            </ul>
         <button className='interestButton' onClick={handleAddInterest}>+</button>
         <select
            id='interestSelect'
            name='interests'
            onChange={handleChange}>
            <option value=''>--Select an Option--</option>
            {interests.map((interest) => {
                return(
                <option
                    value={interest._id}
                    key={interest._id}
                >{interest.name}</option>)
            })}
         </select>
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
