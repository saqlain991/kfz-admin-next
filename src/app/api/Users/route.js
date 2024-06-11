import Cookies from "js-cookie";

// Sample data (replace with actual API calls)
const customers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+9876543210",
  },
  // Add more sample data as needed
];

// Middleware to check authentication
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Validate token (if needed)
  next();
};

// Routes for customer CRUD operations
export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(customers);
      break;
    case "POST":
      // Add new customer logic
      break;
    case "PUT":
      // Update customer logic
      break;
    case "DELETE":
      // Delete customer logic
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
