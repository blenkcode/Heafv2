"use client";

import { useSession } from "next-auth/react";
import React from "react";

const ProfilePicture = () => {
  const { data: session, status } = useSession();
  console.log(session?.user.image);
  if (status === "authenticated") {
    return (
      <div>
        <div className="w-2 h-2 lg:bg-zinc-100 bg-sky-900 rounded-full ml-2"></div>
        {/* <img
          src={session?.user?.image || "/default-profile.png"}
          alt="Profile Picture"
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        /> */}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ProfilePicture;
