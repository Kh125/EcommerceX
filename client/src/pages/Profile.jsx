import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../middleware/usePrivateAxios";
import useAuth from "../hooks/useAuth";
import { createToastMessage } from "../utils/ToastMessage";
import { HashLoader } from "react-spinners";

const Profile = () => {
  const { auth } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [passwordResetMode, setPasswordResetMode] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivateAPI = useAxiosPrivate();

  //password reset
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(true);
  const [passwordResetErrors, setPasswordResetErrors] = useState(null);

  const handlePasswordMatch = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    setMatchPassword(newPasswordValue === confirmPassword);
  };

  const handleConfirmPasswordMatch = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setMatchPassword(newPassword === confirmPasswordValue);
  };

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        console.log("Auth", auth);
        const response = await axiosPrivateAPI.get(
          `/auth/userInfo/${auth?.user}`
        );
        console.log("USer", response?.data?.user);
        setUserInfo(response?.data?.user);
      } catch (error) {
        console.log("UserInfo Fetch Error", error?.response);
      }
    };

    fetchUserInformation();
  }, []);

  const handleInputChange = (e) => {
    console.log("Etarget", e.target);
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setUserInfo((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [fieldName]: value,
        },
      }));
    } else {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    // Implement save functionality
    // console.log("User Info", userInfo);

    setIsLoading(true);
    try {
      const response = await axiosPrivateAPI.post("/auth/userInfo", {
        user: userInfo,
      });

      setIsLoading(false);
      setEditMode(false);
      createToastMessage("User Information successfully updated!", 1);
      // console.log(response.data);
    } catch (error) {
      // console.log(error?.response);
      setIsLoading(false);
      createToastMessage("Failed to update user information", 4);
    }
  };

  const handleResetPassword = async () => {
    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== ""
    ) {
      // console.log("Password Reset");
      setIsLoading(true);
      try {
        // console.log("IND");
        const response = await axiosPrivateAPI.post(
          `/auth/password-reset/${auth?.user}`,
          {
            currentPassword,
            newPassword,
          }
        );
        setIsLoading(false);
        setPasswordResetMode(false);
        createToastMessage(response?.data?.message, 1);
        // console.log(response?.data);
      } catch (error) {
        // console.log(error.response);
        setIsLoading(false);
        createToastMessage("Failed to reset password!", 4);
        if (error.response?.status === 400) {
          const errs = error.response?.data?.errors
            ? Object.values(error.response?.data?.errors)
            : Object.values(error.response?.data);

          const filteredErrors = errs.filter((e) => e.trim() !== "");

          if (filteredErrors.length) {
            setPasswordResetErrors(filteredErrors);
          }
          // console.log(filteredErrors);
        }
      }
    } else {
      alert("Password field cannot be empty!");
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {editMode && !passwordResetMode ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              className="mt-1 block w-full p-2 border border-gray-300 bg-gray-300 rounded-lg"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address.street"
              value={userInfo.address?.street || ""}
              onChange={handleInputChange}
              placeholder="Street"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="address.city"
              value={userInfo.address?.city || ""}
              onChange={handleInputChange}
              placeholder="City"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="address.state"
              value={userInfo.address?.state || ""}
              onChange={handleInputChange}
              placeholder="State"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="address.postalCode"
              value={userInfo.address?.postalCode || ""}
              onChange={handleInputChange}
              placeholder="Postal Code"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="address.country"
              value={userInfo.address?.country || ""}
              onChange={handleInputChange}
              placeholder="Country"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center justify-start space-x-4">
            <button
              disabled={isLoading}
              onClick={handleSave}
              className={`w-[150px] flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {!isLoading && "Save Changes"}
              <HashLoader size={25} loading={isLoading} />
            </button>
            <button
              disabled={isLoading}
              onClick={() => setEditMode(false)}
              className={`flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              Cancel
            </button>
          </div>
        </>
      ) : !editMode && !passwordResetMode ? (
        <>
          <div className="flex items-center justify-between mx-auto space-x-4 px-6">
            <div className="w-[250px] bg-green-700 flex justify-center py-20 rounded-tl-3xl rounded-br-3xl shadow-xl">
              <div className="text-center">
                <img
                  src={userInfo.profileImage || "../images/avatar.jpg"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover mx-auto shadow-xl"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Profile Information
              </h2>
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Username
                  </label>
                  <p className="mt-1 text-gray-600">{userInfo.username}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Email
                  </label>
                  <p className="mt-1 text-gray-600">{userInfo.email}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Phone
                  </label>
                  <p className="mt-1 text-gray-600">
                    {userInfo.phone || "No phone number"}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Address
                  </label>
                  <p className="mt-1 text-gray-600">
                    {userInfo.address?.street}, {userInfo.address?.city},{" "}
                    {userInfo.address?.state}, {userInfo.address?.postalCode},{" "}
                    {userInfo.address?.country}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Joined
                  </label>
                  <p className="mt-1 text-gray-600">
                    {new Date(userInfo.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-[100px] px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setPasswordResetMode(true)}
                    className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Reset Password
          </h2>
          <div className="space-y-4">
            {passwordResetErrors && (
              <div className="border-red-300 bg-gray-200 p-10 rounded-lg shadow-sm">
                {passwordResetErrors.map((error) => (
                  <span key={error} className="text-red-500">
                    {error}
                  </span>
                ))}
              </div>
            )}
            <div>
              <label className="block text-gray-700">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                onChange={handlePasswordMatch}
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                onChange={handleConfirmPasswordMatch}
              />
              {!matchPassword && (
                <span className="text-red-500">Password not match.</span>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                disabled={isLoading}
                onClick={handleResetPassword}
                className={`w-[160px] flex justify-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ${
                  isLoading ? "opacity-50" : ""
                }`}
              >
                {!isLoading && "Reset Password"}
                <HashLoader size={25} loading={isLoading} />
              </button>
              <button
                disabled={isLoading}
                onClick={() => setPasswordResetMode(false)}
                className={`flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ${
                  isLoading ? "opacity-50" : ""
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
