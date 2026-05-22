import React from 'react'
import styles from './Certifications.module.css'
import certification from '../../data/certifications.json'
import CertificationCard from './CertificationCard'

const Certifications = () => {
  return (
    <section className={styles.container} id='certifications'>
        <h2 className={styles.title}>Certifications</h2>
        <div className={styles.certifications}>{
            certification.map((certification, id) => {
                return(
                    <CertificationCard key={id} certification={certification}/>
                )
            })
            }</div>
    </section>
  )
}

export default Certifications
