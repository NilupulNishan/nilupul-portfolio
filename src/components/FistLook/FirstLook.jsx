import React from 'react'
import styles from './FirstLook.module.css'
import ProfilePic from '../../assets/profile/profile_pic.png'
import {  useTypewriter, Cursor} from 'react-simple-typewriter'
import { FaFacebookSquare, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

const FirstLook = () => {
  const [text] = useTypewriter({
    words: ['Thevindu Guruge', 'a Software Engineering Undergraduate', 'a Full Stack Developer'],
    loop: {},
    typeSpeed: 100,  
    deleteSpeed: 50, 
    delaySpeed: 1750,
  })

  return (
    <section className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Hi, I'm</h1>
            <h1 className={styles.name}>
              <span>{text}</span>
              <Cursor cursorColor="white" cursorStyle="|" />
            </h1>
            <p className={styles.description}>I'm a Software Engineering undergraduate at Informatics Institute of Technology (IIT), passionate about Full Stack Development, scalable solutions, and continuous skill improvement.</p>
            
            <div className={styles.btns}>
              <a href="https://github.com/gurugetnm" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaGithub/></a>
              <a href="https://www.linkedin.com/in/thevindu-guruge" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
              <a href="https://www.facebook.com/thevindu.nimdiya" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaFacebookSquare/></a>
              <a href="https://www.instagram.com/thevindu_guruge" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
            </div>
            <div className={styles.btn2}>
                <a href="#contact" className={styles.contactBtn}>Contact Me</a>
            </div>
        </div>
        <img src={ProfilePic} alt="" className={styles.profilePic} />
        <div className={styles.topBlur}/>
    </section>
  )
}

export default FirstLook
