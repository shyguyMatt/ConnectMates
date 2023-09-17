import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { ADD_INTEREST } from '../../utils/mutations';
import { QUERY_INTERESTS, QUERY_SINGLE_USER } from '../../utils/queries';
import './../../styles/Profile.css';
import BioSection from '../elements/bio';


export default function Profile() {

    const token = Auth.loggedIn() ? Auth.getProfile(Auth.getToken()) : null;
    const userId = token.data._id;

    const { loading: loadingUser, data: userData } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId: userId }
    })

    const user = userData?.user || {};

    const { loading: loadingInterests, data: interestData } = useQuery(QUERY_INTERESTS);

    const interests = interestData?.interests || [];

    const [addInterest, { error }] = useMutation(ADD_INTEREST);

    const [interestValue, setInterestValue] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInterestValue(value)
    }

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

    if (loadingInterests) {
        return <div>Loading...</div>
    }

    // console.log(interests[0].name)
    return (
        <div className='userHome' >
            <section className='section1'>
                <section className='main'>
                    <div>
                        <img src="" alt="User Profile" className="" />
                        <button className='picButton'>+</button>
                    </div>
                    <div>
                        <h4> {user.name}'s bio </h4>
                       <BioSection />
                        <button className='bioButton'>+</button>
                    </div>
                </section>
            </section>
          <div className='sideBar-section2'>
            <aside className='sideBar'>
            <h3>Interests</h3>
                <ul>
                    {/*{user.interests.map((interest) => (
                        // console.log(interest.name)
                        <li key={interest._id}>{interest.name}</li>
                    ))}*/}

                </ul>
                <button className='interestButton' onClick={handleAddInterest}>+</button>
                <select
                    id='interestSelect'
                    name='interests'
                    className='flex items-center justify-between p-8 bg-gray-600 shadow-md rounded-full'
                    onChange={handleChange}>
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