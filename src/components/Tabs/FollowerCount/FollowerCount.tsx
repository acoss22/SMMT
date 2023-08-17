import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFollowerCount,
  addSocialMedia,
  deleteSocialMedia,
} from "../../../store/reducer"; // Make sure to import the deleteSocialMedia action creator
import { RootState } from "../../../store/store";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faLinkedinIn,
  faTwitter,
  faTwitch,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";

import styles from "./followercount.module.scss";

const FollowerCount: React.FC = () => {
  const dispatch = useDispatch();

  const followers = useSelector((state: RootState) => state.followers);
  const lastUpdated = useSelector((state: RootState) => state.lastUpdated);
  const [newPlatform, setNewPlatform] = useState("");
  const [newCount, setNewCount] = useState(0);
  const [isPlatformEmpty, setIsPlatformEmpty] = useState(false);

  const platformIcons: { [key: string]: IconDefinition } = {
    Facebook: faFacebookF,
    Instagram: faInstagram,
    Youtube: faYoutube,
    Linkedin: faLinkedinIn,
    Twitter: faTwitter,
    Twitch: faTwitch,
  };

  const handleFollowerChange = useCallback(
    (platform: string, value: number) => {
      const newValue = Math.max(0, value);
      dispatch(updateFollowerCount({ platform, count: newValue }));
    },
    [dispatch]
  );

  const handleAddSocialMedia = useCallback(() => {
    console.log(newPlatform);
    if (newPlatform.trim() !== "") {
      setIsPlatformEmpty(false);
      // Check if the platform name is not empty after trimming
      dispatch(addSocialMedia({ platform: newPlatform, count: newCount }));
      setNewPlatform("");
      setNewCount(0);
      console.log("if")
      console.log(isPlatformEmpty)
    } else {
      setIsPlatformEmpty(true);
      console.log("else")
      console.log(isPlatformEmpty)
     

    }
  }, [dispatch, newPlatform, newCount, isPlatformEmpty]);

  const handleDeleteSocialMedia = useCallback(
    (platform: string) => {
      dispatch(deleteSocialMedia(platform));
    },
    [dispatch]
  );

  const memoizedPlatformIcons = useMemo(() => platformIcons, []);
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

              <div className={styles.platform}>
                {memoizedPlatformIcons[platform] && (
                  <FontAwesomeIcon icon={memoizedPlatformIcons[platform]} />
                )}
                Followers
              </div>
              <button
                className={`${styles["delete-social-button"]} ${styles["bottom-right-icon"]}`}
                onClick={() => handleDeleteSocialMedia(platform)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["add-social-media"]}>
        <input
          className={`${styles["add-social-media-input"]} ${
            isPlatformEmpty ? styles["red-border"] : ""
          }`}
          placeholder="New Platform"
          value={newPlatform}
          onChange={(e) => {
            setNewPlatform(e.target.value);
            setIsPlatformEmpty(e.target.value.trim() === ""); // Update flag
          }}
        />
        <div className={styles["checkbox-line"]}>
          <input
            className={styles["add-social-media-count"]}
            placeholder="Follower Count"
            type="number"
            value={newCount}
            onChange={(e) => setNewCount(parseInt(e.target.value))}
          />{" "}
          Followers
        </div>
        <button
          className={styles["add-social-media-button"]}
          onClick={handleAddSocialMedia}
        >
          Add Social Media
        </button>
      </div>
    </div>
  );
};

export default FollowerCount;
