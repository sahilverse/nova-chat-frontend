"use client";
import api from "@/api/axios";
import { useEffect } from "react";


export default function ChatPage() {


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/users/me");
                console.log("Protected data:", response.data);
            }
            catch (error) {
                console.error("Error fetching protected data:", error);
            }
        };


        fetchData();
    }, []);


    return <div>Chat Page - Protected</div>;
}