import classes from "../styles/meetupDetails.module.css";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import Head from "next/head";

import { useRouter } from "next/router";
function meetupDetails(props) {
  //console.log(props.data.id);
  return (
    <>
      <Head>
        <title>{props.data.title}</title>
        <meta name="description" content={props.data.description} />
      </Head>
      <div className={classes.meetupDetailContainer}>
        <div className={classes.detailImageContainer}>
          <img
            src={props.data.image ? props.data.image : null}
            alt={props.data.title ? props.data.title : null}
          />
        </div>
        <div className={classes.meetupDetailInfo}>
          <h1>{props.data.title ? props.data.title : null}</h1>
          <address>{props.data.address ? props.data.address : null}</address>
          <p>{props.data.description ? props.data.description : null}</p>
        </div>
      </div>
    </>
  );
}
export default meetupDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://frankentsie301:V0jZYbre4pFmipZt@cluster0.8riafnk.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();
  let arrPaths = meetups.map((meetup) => ({
    params: {
      meetupId: meetup._id.toString(),
    },
  }));

  client.close();
  //     paths: [
  //       { params: { meetupId: "m1" } },
  //       { params: { meetupId: "m2" } },
  //       { params: { meetupId: "value" } },
  //     ],
  // console.log(arrPaths);
  return {
    fallback: false,
    paths: arrPaths,
  };
}

export async function getStaticProps(context) {
  const meetUpId = context.params.meetupId;
  // console.log(meetUpId);
  const client = await MongoClient.connect(
    "mongodb+srv://frankentsie301:V0jZYbre4pFmipZt@cluster0.8riafnk.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");
  // console.log(meetUpId);
  const selectedMeetup = await meetupsCollections.findOne({
    _id: new ObjectId(meetUpId),
  });

  client.close();

  // console.log(selectedMeetup);

  return {
    props: {
      data: {
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
