import React from 'react';
// import Auth from '';
import './../../styles/Profile.css';


export default function Profile() {
    return (
    <div className='userHome' >
        <section>
         <h1>user name </h1>
            <section className='bio'>
             <div  className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
              <img src="" alt="User Profile"   className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden"/>
              <button> Add Profile Picture  </button>
             </div>
             <div>
              <p> user bio </p>
              <button> ADD BIO </button>
             </div>
            </section>
        </section>
        <aside>
         <h3>Selected Code Languages </h3>
          <ul>
             <li>Visual test</li>
             <li>Visual test</li>
          </ul>
         <button> Add New Languages </button>
        </aside>
        <section>
            <h3>Completed Projects </h3>
            <ul>
                <li>Visual test 1"</li>
                <li>Visual test 2</li>
                <li>Visual test 3</li>
            </ul>
        </section>
    </div>
  );

}
