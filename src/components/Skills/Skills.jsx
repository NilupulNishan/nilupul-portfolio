import React from 'react'

import styles from './Skills.module.css'
import skills from '../../data/skills.json'

const Skills = () => {
  return (
    <section className={styles.container} id='skills'>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.content}>
        <div className={styles.skills}>{
          skills.map((skill, id) => {
            return(
              <div key={id} className={styles.skill}>
                <div className={styles.skillImgContainer}>
                  <img src={`/icons/${skill.imageSrc}`}  alt={skill.title}/>
                  </div>
                  <p>{skill.title}</p>
              </div>
            )
          }
          )
        }</div>
      </div>
    </section>
  )
}

export default Skills
