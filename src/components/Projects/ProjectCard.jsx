import React from 'react'
import styles from './ProjectCard.module.css'
import { FaGithub } from "react-icons/fa"

const ProjectCard = ({
    project:{title,description,skills,source}
    }) => {
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <ul className={styles.skills}>{skills.map((skill,id)=>{
            return(
                <li key={id} className={styles.skill}>{skill}</li>
        )
            })}
        </ul>
        <div className={styles.links}>
            <a href={source} className={styles.link} target="_blank" rel="noopener noreferrer"><FaGithub/></a>
        </div>
    </div>
  )
}

export default ProjectCard
