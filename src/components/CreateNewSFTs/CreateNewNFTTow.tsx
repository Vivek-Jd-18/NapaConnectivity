import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './CreateNewNFTTow.module.scss';
import SectionOne from './section/SectionOne';
import SectionTow from './section/SectionTow';
import SectionThreeTbl from './section/SectionThreeTbl';
import SectionFourTbl from './section/SectionFourTbl';
import SectionFiveSlider from './section/SectionFiveSlider';


export default function CreateNewNFTTow() {
 
  return (
    <>
        <div className="CreateNewnftTow">
            <SectionOne />
            <SectionTow />
            <SectionThreeTbl />
            <SectionFourTbl />
            <SectionFiveSlider />
        </div>            
    </>
  )
}
