import React from 'react'
import styles from './FirstLook.module.css'
import ProfilePic from '../../assets/profile/profile_pic.png'
import {  useTypewriter, Cursor} from 'react-simple-typewriter'
import { FaFacebookSquare, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

const FirstLook = () => {
  const [text] = useTypewriter({
    words: ['Nilupul Nishan', 'an AI / ML Engineer', 'a Content Creator'],
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
            <p className={styles.description}>I'm an AI/ML Engineer and entrepreneur from Sri Lanka, passionate about building intelligent software, web and mobile applications, and real-world AI solutions.</p>

            <div className={styles.btns}>
              <a href="https://github.com/NilupulNishan" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaGithub/></a>
              <a href="https://www.linkedin.com/in/nilupulnishan" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
              <a href="https://www.facebook.com/mr.nilupul.2k" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaFacebookSquare/></a>
              <a href="https://www.instagram.com/nilupul_nishan" className={styles.iconBtn} target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
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
