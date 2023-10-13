import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
    const connClient = await MongoClient.connect(
      "mongodb+srv://frankentsie301:V0jZYbre4pFmipZt@cluster0.8riafnk.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    console.log(connClient);
    const db = connClient.db();

    console.log(req.body);

    const meetupsCollections = db.collection("meetups");
    const result = await meetupsCollections.insertOne(data);
    console.log(result);
    connClient.close();

    res.status(201).json({ message: "meetup Inserted" });
  }
}

export default handler;
