import React from 'react';
// import Auth from '';
import './../../styles/Profile.css';


export default function Profile() {
    return (
    <div className='userHome' >
        <aside className='asideBar'>
         <h4>Selected Code Languages </h4>
          <ul>
             <li>Visual test</li>
             <li>Visual test</li>
          </ul>
         <button className='addButtons'>+</button>
        </aside>
        <section className='main'>
         <h1>user name </h1>
            <section className='section1'>
             <div  className="bio">
              <img src="" alt="User Profile"   className=""/>
              <button className='addButtons'>+</button>
             </div>
             <div>
              <p> user bio </p>
              <button className='addButtons'>+</button>
             </div>
            </section>
        </section>
        <section className='section2'>
            <h4>Completed Projects </h4>
            <ul>
                <li>Visual test 1"</li>
                <li>Visual test 2</li>
                <li>Visual test 3</li>
            </ul>
        </section>
    </div>
  );

}
