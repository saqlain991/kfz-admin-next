import axios from "axios";
import Cookies from "js-cookie";

// Middleware to check authentication
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Validate token (if needed)
  next();
};

// Get data from the API
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const response = await axios.get("https://d33ftxxwr8ksno.cloudfront.net/orders/get_orders_admin", {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        });
        const data = response.data;
        res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;
    case "POST":
      authenticate(req, res, async () => {
        try {
          // Logic to add new data
          res.status(200).json({ message: "Data added successfully" });
        } catch (error) {
          console.error("Error adding data:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
      break;
    case "PUT":
      authenticate(req, res, async () => {
        try {
          // Logic to edit data
          res.status(200).json({ message: "Data updated successfully" });
        } catch (error) {
          console.error("Error updating data:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
      break;
    case "DELETE":
      authenticate(req, res, async () => {
        try {
          // Logic to delete data
          res.status(200).json({ message: "Data deleted successfully" });
        } catch (error) {
          console.error("Error deleting data:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
