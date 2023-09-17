import React from 'react';
import {
  FaHome,
  FaRegBuilding,
  FaRegEnvelope,
  FaRegUserCircle,
  FaUserAstronaut,
  FaUserInjured,
  FaUserNinja,
  FaUserSecret,
  FaUserTie,
  FaWhatsapp,
} from 'react-icons/fa';
import './../../styles/footer.css';


const ICON_SIZE = 20;

export default function Footer() {
  return (
    <footer>
      <div class="footContainer">
        <div class="footer-content">
          <div class="contact-info">
            <h3><b>Contact Us</b></h3>
            <p><FaRegBuilding size={ICON_SIZE} />1 Main Street, Kill Devil Hills, North Carolina</p>
            <p><FaWhatsapp size={ICON_SIZE} /> Phone: (000) 867-5309</p>
            <p><FaRegEnvelope size={ICON_SIZE} />Email: ConnectMates@Gmail.com</p>
          </div>
          <img src={require('./../../assets/images/torch.gif')} alt="Torch"></img>
          <div class="quick-links">
            <h3><b>Quick Links</b></h3>
            <p><a href="/Home"><FaHome size={ICON_SIZE} /></a></p>
            <p><a href="/Profile"><FaRegUserCircle size={ICON_SIZE} /></a></p>
          </div>
          <img src={require('./../../assets/images/torch.gif')} alt="Torch"></img>
          <div class="groupLinks">
            <h3><b>Connect with Us</b></h3>
            <ul>
              <li><a href="https://github.com/JessePomeroy"><FaUserTie size={ICON_SIZE} />Jesse Pomerroy</a></li>
              <li><a href="https://github.com/kevhuff"><FaUserAstronaut size={ICON_SIZE} />Kevin Huff</a></li>
              <li><a href="https://github.com/shyguyMatt"><FaUserNinja size={ICON_SIZE} />Mathew H</a></li>
              <li><a href="https://github.com/FowlerMichael"><FaUserInjured size={ICON_SIZE} />Michael Fowler</a></li>
              {/*lol Despairpig*/}
              <li><a href="https://github.com/philwalk24"><FaUserSecret size={ICON_SIZE} />Despairpig</a></li>
            </ul>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; 2023 ConnectMates. All rights reserved.</p>
          <p><a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  )
}