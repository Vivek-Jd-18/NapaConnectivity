import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './Earn.module.scss';



export default function EarnPage() {

  return (
    <div className={styles.container}>
      <Container className={styles.settingsContainer}>
        <h1 className={styles.settings}>User Settings</h1>
        <div className={styles.tabsContainer}>
          asdasd
        </div>
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
};


