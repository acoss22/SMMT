import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFollowerCount, addSocialMedia, deleteSocialMedia } from "../../../store/reducer";
import { RootState } from "../../../store/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
    dispatch(deleteSocialMedia(platform));
  };

  return (
    <div className={styles["tab2-content"]}>
      <h2>Follower Count</h2>
      <div className={styles["social-list"]}>
        {Object.keys(followers).map((platform) => (
          <div key={platform} className={styles["social-item"]}>
            <h3>{platform}</h3>
            <div className={styles["input-container"]}>
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
              <p className={styles.platform}>Followers</p>
            </div>
            <button
              className={`${styles["delete-social-button"]} ${styles["bottom-right-icon"]}`}
              onClick={() => handleDeleteSocialMedia(platform)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
      <div className={styles["add-social-media"]}>
        {/* ... */}
      </div>
      <p>Last updated at {lastUpdated}</p>
    </div>
  );
};

export default FollowerCount;
