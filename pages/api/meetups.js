async function handler(req, res) {
  if (req.method === "GET") {
    // const connClient = await MongoClient.connect(
    //   "mongodb+srv://frankentsie301:V0jZYbre4pFmipZt@cluster0.8riafnk.mongodb.net/meetups?retryWrites=true&w=majority"
    // );
    // console.log(connClient);
    // const db = connClient.db();

    // const meetupsCollections = db.collection("meetups");
    // const result = await meetupsCollections.find({ title: "First Meetup" });

    // console.log(result);

    // connClient.close();
    console.log("meetups");

    //res.status(201).json({ message: "meetup Inserted" });
  }
}
