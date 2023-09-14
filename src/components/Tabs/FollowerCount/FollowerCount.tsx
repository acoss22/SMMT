import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFollowerCount,
  addSocialMedia,
  deleteSocialMedia,
  updateFollowers
} from "../../../store/reducer";
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
import { Auth, Logger } from "aws-amplify";
import awsconfig from "../../../aws-exports";
import AWS from "aws-sdk";
import styles from "./followercount.module.scss";
 
Auth.configure(awsconfig);
 
const logger = new Logger("Follower Count");
 
interface FollowerCount {
  id: string;
  followers: number;
  newValue: number;
  platform: string;
}
 
const FollowerCount: React.FC = () => {
  const dispatch = useDispatch();
  const followers = useSelector((state: RootState) => state.followers);
  const [newPlatform, setNewPlatform] = useState("");
  const [newCount, setNewCount] = useState(0);
  const [isPlatformEmpty, setIsPlatformEmpty] = useState(false);
  const [isDuplicatePlatform, setIsDuplicatePlatform] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
 
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
    if (newPlatform.trim() !== "") {
      setIsPlatformEmpty(false);
 
      if (!followers[newPlatform]) {
        setIsDuplicatePlatform(false);
 
        dispatch(addSocialMedia({ platform: newPlatform, count: newCount }));
        setNewPlatform("");
        setNewCount(0);
      } else {
        setIsDuplicatePlatform(true);
      }
    } else {
      setIsPlatformEmpty(true);
    }
  }, [dispatch, followers, newPlatform, newCount]);
 
  const handleDeleteSocialMedia = useCallback(
    (platform: string) => {
      dispatch(deleteSocialMedia(platform));
    },
    [dispatch]
  );
 
  const fetchUserFollowers = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userEmail = user.attributes.email;
      const credentials = await Auth.currentCredentials();
      const lambda = new AWS.Lambda({
        credentials: Auth.essentialCredentials(credentials),
        region: awsconfig.aws_project_region,
      });
      const params = {
        FunctionName: "getFollowersFromUsername",
        InvocationType: "RequestResponse",
        Payload: JSON.stringify({ email: userEmail }),
      };
      try {
        const response = await lambda.invoke(params).promise();
        if (response.Payload !== undefined) {
          const payloadString = response.Payload.toString();
          try {
            const payload = JSON.parse(payloadString);
            const followersData = JSON.parse(payload.body);
            console.log("followersData," , followersData);
   
            if (Array.isArray(followersData)) {
              followersData.forEach((item) => {
                const { email, followers, platform, newValue } = item;
                dispatch(updateFollowers({ email, followers, platform, newValue }));
              });
              setFetchError(null);
            } else {
              setFetchError("Received unexpected data format.");
            }
          } catch (parseError) {
            setFetchError("Error parsing response data.");
          }
        } else {
          setFetchError("Response payload is missing or empty.");
        }
      } catch (error) {
        logger.error("Error retrieving tasks:", error);
        setFetchError("Error retrieving tasks.");
      }
    } catch (error) {
      logger.error("Error fetching user:", error);
      setFetchError("Error fetching user.");
    }
    setIsLoading(false); // Mark loading as complete
  };
   
  useEffect(() => {
    fetchUserFollowers();
  }, []);
 
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
              <div>
                <button
                title="delete"
                  className={`${styles["delete-social-button"]} ${styles["bottom-right-icon"]}`}
                  onClick={() => handleDeleteSocialMedia(platform)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["add-social-media"]}>
        <input
          className={`${styles["add-social-media-input"]} ${
            isPlatformEmpty || isDuplicatePlatform ? styles["red-border"] : ""
          }`}
          placeholder="New Platform"
          value={newPlatform}
          onChange={(e) => {
            setNewPlatform(e.target.value);
            setIsPlatformEmpty(e.target.value.trim() === "");
            setIsDuplicatePlatform(false); // Clear duplicate flag when user types
          }}
        />
        {isPlatformEmpty && (
          <div className={styles["error-message"]}>
            You can't add a nameless platform.
          </div>
        )}
        {isDuplicatePlatform && (
          <div className={styles["error-message"]}>
            {`${newPlatform} platform is already in the list.`}
          </div>
        )}
        <div className={styles.line}>
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
