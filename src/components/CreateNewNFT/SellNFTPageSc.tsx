import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './SellNFTPageSc.module.scss';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SellNFTPage from './SellNFTPage';
import { getMintedPost } from '@/services/MintApi';
import { MintPost } from '@/types/mint';
import { useRouter } from 'next/router';

export default function SellNFTPageSc() {
  const [loading, setLoading] = React.useState(false);
  const [mintPost, setMintPost] = React.useState<MintPost | null>(null);
  const router = useRouter();

  const handleGetMintPost = async (id: string) => {
    setLoading(true);
    const { data }: any = await getMintedPost(id);
    setMintPost(data?.data || []);
    console.log('data?.data', data?.data);
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.id) {
      handleGetMintPost(router.query.id as string);
    }
  }, [router]);

  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <div className={styles.StaylinkFrst}>
          <Link href="collection">
            <a>
              <Image
                src="/img/arrow_icon.svg"
                alt=""
                width="18px"
                height="12px"
              />
              Back to Collection
            </a>
          </Link>
        </div>
        <h1 className={styles.settings}>List Assets</h1>
        <div>
          <SellNFTPage mintDetails={mintPost} loading={loading} />
        </div>
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
