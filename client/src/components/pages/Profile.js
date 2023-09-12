import React from 'react';
import Auth from '';
import 'tailwindcss/tailwind.css';

export default function UserHome() {
    return (
    <div className='userHome-container'>
        <section>
         <h1>user name </h1>
            <section>
             <div>
              <img src="" alt="User Profile Picture"/>
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
            <h3>Search Joinable Projects </h3>
            <input type="text" placeholder="Search For Projects"/>
            <button> Search </button>
        </section>
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
