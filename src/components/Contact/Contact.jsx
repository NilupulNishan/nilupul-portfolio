import React from 'react'
import { FaFacebookSquare, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import styles from './Contact.module.css'

const Contact = () => {
  return (
    <footer id='contact'className={styles.footer} >
      <div className={styles.container}>
        <div className={styles.text}>
            <h2>Get in Touch</h2>
            <p>Reach out anytime!</p>
        </div>
        <div className={styles.btns}>
            <a href="https://wa.me/94713019300" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaWhatsapp/></a>
            <a href="https://www.facebook.com/thevindu.nimdiya" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaFacebookSquare/></a>
            <a href="https://www.instagram.com/thevindu_guruge" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
            <a href="https://github.com/gurugetnm" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaGithub/></a>
            <a href="https://www.linkedin.com/in/thevindu-guruge" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
        </div>
        </div>
        <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} Thevindu Guruge. All Rights Reserved.</p>
        </div>
        
    </footer>
    
  )
}

export default Contact
