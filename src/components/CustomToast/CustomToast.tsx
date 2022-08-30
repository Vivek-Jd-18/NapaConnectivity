import Image from 'next/image';
import styles from './CustomToast.module.scss';

type CustomToastWithLinkProps = {
  icon?: string;
  title: string;
  description?: string;
  time?: string;
};

export const CustomToastWithLink = ({
  icon,
  title,
  description,
  time,
}: CustomToastWithLinkProps) => (
  <div className={`${styles.toast} d-flex w-100`}>
    {icon ? (
      <div className={styles.toastIcon}>
        <Image src={icon} alt={`${title}`} width={25} height={25} />
      </div>
    ) : (
      <div></div>
    )}
    <div>
      <p className={styles.toastTitle}>{title}</p>
      {description && <p className={styles.toastMessage}>{description}</p>}
    </div>
    <span className={styles.toastTime}>{time && time}</span>
  </div>
);
