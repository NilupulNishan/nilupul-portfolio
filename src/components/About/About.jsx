import React from 'react'
import styles from './About.module.css'
import DeveloperImg from '../../assets/about/DeveloperImage_lite.png'
const About = () => {
  return (
    <section className={styles.container} id='about'>
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
            <img 
                src={DeveloperImg} 
                alt="programmer sitting"
                className={styles.developerImg} 
            />
            <ul className={styles.aboutItems}>
                <li className={styles.aboutItem}>
                    <h3>My Expertise</h3>
                    <p>I have experience in Full Stack Development, working with technologies like Java, Flutter, MySQL and MERN Stack. My focus is on building efficient, scalable applications with clean and maintainable code.</p>
                </li>
                <li className={styles.aboutItem}>
                    <h3>What Drives Me?</h3>
                    <p>I’m always eager to solve real-world problems through technology. My passion lies in continuous learning, innovation, and crafting user-friendly digital experiences.</p>
                </li>
                <li className={styles.aboutItem}>
                    <h3>Projects & Achievements</h3>
                    <p>I've worked on projects like Venomverse, a machine-learning-based identification app, and a taxi booking system. These experiences have strengthened my problem-solving and development skills.</p>
                </li>
                <li className={styles.aboutItem}>
                    <h3>Beyond Coding</h3>
                    <p>Outside of programming, I enjoy cycling, reading, and listening to rap music. I'm also interested in business and content creation, exploring ideas for future ventures.</p>
                </li>
            </ul>

        </div>
    </section>
  )
}

export default About
