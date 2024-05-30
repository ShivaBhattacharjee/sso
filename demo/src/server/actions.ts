"use server";

export const getUser = async (username: string) => {
    try {
        if (!username) {
            return { message: "User id is required" };
        }
        const res = await fetch(`http://localhost:3000/api/profile?username=${username}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return { message: "Internal server error" };
    }
};
