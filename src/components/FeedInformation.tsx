import { getCurrentTabFeeds } from "@/lib/chrome";
import { css } from "@emotion/css";
import { useEffect, useState } from "react";

const styleFeedList = css`
  width: 320px;
  padding: 8px;
  list-style: none;
`;
const styleFeed = css`
  display: flex;
  gap: 8px;
`;
const styleFaviconImage = css`
  height: 16px;
  width: 16px;
`;
const styleFeedInformation = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;
const stylePageTitle = css`
  font-size: 12px;
  line-height: 1.2;
  font-weight: bold;
`;
const styleFeedUrl = css`
  margin-top: 4px;
  color: light-gray;
  font-size: 10px;
  word-break: break-all;
`;

const FeedInformation = () => {
  const [feed, setFeeds] = useState<{
    faviconUrl: string;
    feedUrl: string;
    pageTitle: string;
  }>();

  useEffect(() => {
    getCurrentTabFeeds().then((currentTabFeeds) => {
      setFeeds(currentTabFeeds);
    });
  }, []);

  return (
    <div className={styleFeedList}>
      {feed && (
        <div className={styleFeed}>
          <img
            src={feed.faviconUrl}
            className={styleFaviconImage}
            alt={`${feed.pageTitle} favicon`}
          />
          <div className={styleFeedInformation}>
            <span className={stylePageTitle}>{feed.pageTitle}</span>
            <div className={styleFeedUrl}>{feed.feedUrl ? feed.feedUrl : "Feed Not Found"}</div>
          </div>
          <button
            type="button"
            disabled={!feed.feedUrl}
            onClick={() => navigator.clipboard.writeText(feed.feedUrl)}
          >
            copy
          </button>
        </div>
      )}
    </div>
  );
};

export { FeedInformation };
