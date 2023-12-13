import mongoose from "mongoose";
import { app } from "./app";

const port = 5000;

// getting-started.js
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://tourstravel:rpHhjDWGgW3Q59rM@tours-travels.ast3kax.mongodb.net/order-management?retryWrites=true&w=majority",
    );

    app.listen(port, () => {
      console.log(`Order Management app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
