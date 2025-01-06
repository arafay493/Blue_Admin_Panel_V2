import Image from "next/image";
import Link from "next/link";
import FeatherIconCom from "CommonElements/Icons/FeatherIconCom";
import React from "react";
import { Admin } from "utils/Constant";
import { profileListData } from "Data/HeaderData";
import { Logout } from "../../../../utils/Constant/index";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/authentication/login");
  };

  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media">
        <Image
          className="b-r-10"
          src="/assets/images/dashboard/profile.png"
          alt="Profile"
          width={35}
          height={35}
        />
        <div className="media-body">
          <span>{localStorage.getItem("UserName") || "Guest"}</span>
          <p className="mb-0 font-roboto">
            {Admin} <i className="middle fa fa-angle-down" />
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {profileListData &&
          profileListData.map((item, index) => (
            <li key={index}>
              <Link href={item.path}>
                <FeatherIconCom iconName={item.icon} />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        <li onClick={handleLogOut}>
          <span style={{ color: "red" }}>
            <FeatherIconCom iconName={"LogIn"} className="red-text" />
          </span>
          <span style={{ color: "red" }}>{Logout}</span>
        </li>
      </ul>
    </li>
  );
};

export default Profile;
