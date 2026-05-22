import React from 'react'
import styles from './CertificationCard.module.css'

const CertificationCard = (
    {
        certification:{title,skills,date,link}
        }) => {
  return (
     <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <ul className={styles.skills}>{skills.map((skill,id)=>{
                return(
                    <li key={id} className={styles.skill}>{skill}</li>
            )
                })}
            </ul>
            <p className={styles.date}>{date}</p>
            <div className={styles.links}>
                <a href={link} className={styles.link} target="_blank" rel="noopener noreferrer">Certificate</a>
            </div>
        </div>
  )
}

export default CertificationCard
