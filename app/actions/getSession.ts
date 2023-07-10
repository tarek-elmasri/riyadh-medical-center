import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";

const getSession = async () => await getServerSession(authOptions);

export default getSession;
