import { redirect } from "next/navigation";

const page = () => {
    redirect("http://localhost:3000/login?redirectUrl=http://localhost:3001/identity");
};

export default page;
