import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetup() {
  const router = useRouter();
  async function addMeetUphandler(enteredMeetup) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetup),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
    // console.log(enteredMeetup);
  }

  return (
    <>
      <Head>
        {" "}
        <title>Add New Meetup</title>
      </Head>
      <div>
        <NewMeetupForm onAddMeetup={addMeetUphandler} />
      </div>
    </>
  );
}
export default NewMeetup;
