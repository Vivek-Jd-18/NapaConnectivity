import React from 'react'
import styles from './PrivacyPolicySc.module.scss';
import Footer from '../Footer/Footer';
import Container from '../../Layout/Container/Container';

export default function PrivacyPolicySc() {
  return (
    <>
    <div
      className={styles.WidthFull}
    >
      <Container
        className={`${styles.napaLoungeContainer} asinnerContainer`}
      >
        <div className={styles.MainContact}>
          <div className={styles.MainTextHelp}>
           <h1>Privacy Policy</h1>
            <div className={styles.Privecy}>
              <h4>1. <span>What Kind of Personal Information We Collect</span></h4>
                <p>1.1. <span>While providing Our services We may collect the “Personal Information” which is defined as any information that identifies or can be used to identify, contact, or locate the person to whom such information pertains. Namely, we may collect:</span></p>
                <p >1.1.1. <span>Identity information: name, facial image, social security number, ID number, documents proving your identity and any other information they may contain;</span></p>
                <p>1.1.2. <span>Residential information: IP address, residence address, documents proving your residency and any other information they may contain;</span></p>
                <p>1.1.3. <span>Contact information: email address, mailing address, phone number;</span></p>
            </div>
            <div className={styles.Privecy}>
              <h4 className={styles.PrivecyHeder}>2. <span>How We Use Your Personal Information</span> </h4>
                <p>2.1. <span>Contact information: email address, mailing address, phone number;</span> </p>
                <p>2.1.1. <span>To provide you the Services: We may use information to execute your transaction requests and trade orders;</span></p>
                <p>2.1.2. <span>To comply with the our legal obligations: In many jurisdictions we are obliged to collect certain information about our Users to be authorized to act (Know Your Client and Anti-Money Laundering regulations);</span></p>
                <p>2.1.3. <span>To protect your assets: We may use information to identify you and the assets belonging to you in order to secure access to your accounts and to prevent the fraud;</span></p>
                <p>2.1.4. <span>To improve customer service: information provided by Users helps Us respond to customer service requests and support needs more efficiently;</span></p>  
                <p>2.1.5. <span>To personalize User experience: We may use information in a general manner to understand how Our Users as a group use the services and resources provided on Our Technology Platform;</span></p>
                <p>2.1.6. <span>To improve Our Technology Platform: We may use the feedback provided by Users to improve Our products and services;</span></p>
            </div>
            <div className={styles.Privecy}>
              <h4 className={styles.PrivecyHeder}>3. <span> How We Can Share the Information</span></h4>
                <p>3.1. <span>In certain situations, We may be required to disclose personal data in response to lawful requests by competent authorities, including to meet national security, public interests or law enforcement requirements. Our policies regarding exchange of information with competent authorities is reflected in Our Transparency Policy.</span></p>
                <p>3.2. <span>We may disclose your Personal Information where required by law (e.g., to comply with a subpoena, warrant, court order, or legal process served on HitBTC), and when we believe that disclosure is necessary to protect our rights, avoid litigation, protect your safety or the safety of others, investigate fraud, and/or respond to a government request.</span></p>
                <p>3.3. <span>You agree that we may share and transfer your information to the third party. We require any company with which we may share Personal Information to protect that data in a manner consistent with this policy and to limit the use of such Personal Information to the performance of services for HitBTC.</span></p>
                <p>3.4. <span>You agree that We may share and transfer Your information which no longer identifies You to the third party (pseudonymisation) who is a contracting party with Us, usually Our service providers or advertising partners.</span></p>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.footerContainer}>
        <Footer footerIconShow={false} />
      </div>
    </div>
    </>
  )
}
