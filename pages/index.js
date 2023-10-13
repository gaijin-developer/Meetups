import Head from "next/head";
import { MongoClient } from "mongodb";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MeetupList from "@/components/meetups/MeetupList";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="list of Meetups you plan to have" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://frankentsie301:V0jZYbre4pFmipZt@cluster0.8riafnk.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 2,
  };
}
