// /pages/api/admins/route.js
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://d33ftxxwr8ksno.cloudfront.net/admins';

export default async function handler(req, res) {
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");

  const apiClient = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await apiClient.get(`${BASE_URL}/get_admins`);
        res.status(200).json({ data: response.data });
      } catch (error) {
        res.status(500).json({ error: 'Error fetching admin data' });
      }
      break;

    case 'POST':
      try {
        const { name, email, password, admin_type } = req.body;
        const response = await apiClient.post(
          `${BASE_URL}/regiterSubAdmin`,
          { name, email, password, admin_type }
        );
        res.status(201).json({ data: response.data });
      } catch (error) {
        res.status(500).json({ error: 'Error adding admin' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const response = await apiClient.delete(`${BASE_URL}/get_admins/${id}`);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Error deleting admin' });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const { name, email, admin_type } = req.body;
        const response = await apiClient.put(
          `${BASE_URL}/get_admins/${id}`,
          { name, email, admin_type }
        );
        res.status(200).json({ data: response.data });
      } catch (error) {
        res.status(500).json({ error: 'Error updating admin' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
