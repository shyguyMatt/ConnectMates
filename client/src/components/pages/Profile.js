import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_INTEREST } from '../../utils/mutations';
import { QUERY_INTERESTS, QUERY_SINGLE_USER } from '../../utils/queries';

import Auth from '../../utils/auth';

import './../../styles/Profile.css';
import BioSection from '../elements/bio';
import Avatar from 'react-avatar';




export default function Profile() {

    // Checks if the user is logged in returns a profile information object
    const token = Auth.loggedIn() ? Auth.getProfile(Auth.getToken()) : null;
    const userId = token.data._id;

    // Defines queries used
    const { loading: loadingUser, data: userData } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId: userId }
    })
    const user = userData?.user || {};

    const { loading: loadingInterests, data: interestData } = useQuery(QUERY_INTERESTS);
    const interests = interestData?.interests || [];

    // Defines mutations used
    const [addInterest, { error }] = useMutation(ADD_INTEREST);

    // Defines states used
    const [interestValue, setInterestValue] = useState('');

    // handles add interest button, sends request to server to update user information
    const handleAddInterest = async () => {
        const selectedInterest = document.querySelector('#interestSelect').value;
        if (!selectedInterest) return;

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


    return (
        <div className='userHome' >
            <section className='section1'>
                <section className='main'>
                    <div>
                        <Avatar
                        name={user.name}
                        />
                        <button className='picButton'>+</button>
                    </div>
                    <div>
                        <h4> {user.name}'s bio </h4>
                            <BioSection user={user}/>
                        <button className='bioButton'>+</button>
                    </div>
                </section>
            </section>

          <div className='sideBar-section2'>
            <aside className='sideBar'>
            <h3>Interests</h3>
                <ul>
                   {/* {user.interests.map((interest) => (
                        <li key={interest._id}>{interest.name}</li>
                    ))} */}
                </ul>

                <button className='interestButton' onClick={handleAddInterest}>+</button>

                {/* Dropdown menu to select interests to add */}
                <select
                    id='interestSelect'
                    name='interests'
                    className='flex items-center justify-between p-8 bg-gray-600 shadow-md rounded-full'
                    >
                    <option value=''>--Select an Option--</option>
                    {interests.map((interest) => {
                        return (
                            <option
                                value={interest._id}
                                key={interest._id}
                            >{interest.name}</option>)
                    })}
                </select>         
            </aside>

            <section className='section2'>
            <h3>Completed Projects </h3>
                <ul>
                    <li>Visual test 1</li>
                    <li>Visual test 2</li>
                    <li>Visual test 3</li>
                </ul>
            </section>
          </div>
        </div>
    );

}