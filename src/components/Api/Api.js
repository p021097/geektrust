import axios from "axios";

const fetchAdminData = async () => {
  try {
    const res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

fetchAdminData();

export default fetchAdminData;
