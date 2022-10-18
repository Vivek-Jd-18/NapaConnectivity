import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './CreateNewNFTTow.module.scss';
import SectionOne from './section/SectionOne';
import SectionTow from './section/SectionTow';


export default function CreateNewNFTTow() {
 
  return (
    <>
        <div className={styles.CreateNewnftTow}>
            <SectionOne />
            <SectionTow />
        </div>            
    </>
  )
}
