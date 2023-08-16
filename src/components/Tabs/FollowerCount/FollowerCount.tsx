import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFollowerCount, addSocialMedia, deleteSocialMedia } from "../../../store/reducer"; // Make sure to import the deleteSocialMedia action creator
import { RootState } from "../../../store/store";
import styles from "./followercount.module.scss";

const FollowerCount: React.FC = () => {
  const dispatch = useDispatch();

  const followers = useSelector((state: RootState) => state.followers);
  const lastUpdated = useSelector((state: RootState) => state.lastUpdated);
  const [newPlatform, setNewPlatform] = useState("");
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    dispatch(
      updateFollowerCount({ platform: "Facebook", count: followers.Facebook })
    );
    dispatch(
      updateFollowerCount({ platform: "Instagram", count: followers.Instagram })
    );
  }, [dispatch, followers]);

  const handleFollowerChange = (platform: string, value: number) => {
    const newValue = Math.max(0, value);
    dispatch(updateFollowerCount({ platform, count: newValue }));
  };

  const handleAddSocialMedia = () => {
    dispatch(addSocialMedia({ platform: newPlatform, count: newCount }));
    setNewPlatform("");
    setNewCount(0);
  };

  const handleDeleteSocialMedia = (platform: string) => {
    dispatch(deleteSocialMedia(platform)); // Call the deleteSocialMedia action creator with the platform to be deleted
  };

  return (
    <div className={styles["tab2-content"]}>
      <h2>Follower Count</h2>
      <div className={styles["social-list"]}>
        {Object.keys(followers).map((platform) => (
          <div key={platform} className={styles["social-item"]}>
            <h3>{platform}</h3>
            <p className={styles["input-container"]}>
              <input
                className={styles["input-checkbox"]}
                type="number"
                value={followers[platform]}
                onChange={(e) =>
                  handleFollowerChange(platform, parseInt(e.target.value))
                }
                onKeyPress={(e) => {
                  if (isNaN(Number(e.key))) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const pasteData = e.clipboardData.getData("text/plain");
                  if (!/^\d+$/.test(pasteData)) {
                    e.preventDefault();
                  }
                }}
              />
              Followers
              <button
                className={styles["delete-social-button"]}
                onClick={() => handleDeleteSocialMedia(platform)}
              >
                Delete
              </button>
            </p>
          </div>
        ))}
      </div>
      <div className={styles["add-social-media"]}>
        <input
          className={styles["add-social-media-input"]}
          placeholder="New Platform"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
        />
        <input
          className={styles["add-social-media-count"]}
          placeholder="Follower Count"
          type="number"
          value={newCount}
          onChange={(e) => setNewCount(parseInt(e.target.value))}
        />
        <button
          className={styles["add-social-media-button"]}
          onClick={handleAddSocialMedia}
        >
          Add Social Media
        </button>
      </div>
      <p>Last updated at {lastUpdated}</p>
    </div>
  );
};

export default FollowerCount;
