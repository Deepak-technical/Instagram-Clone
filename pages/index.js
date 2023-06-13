import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Stories from '../components/Stories'
import Feed from '../components/Feed'
import Modal from '../components/Modal'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Instagram AI</title>
        
      </Head>
      <Header/>
      <Feed/>
      {/* <Stories/> */}

   <Modal/>
    </div>
  )
}
