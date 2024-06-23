const getCurrentTab = async () => {
	const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
	return tabs[0];
};

const extractFeedLinks = () => {
	const isFeedType = (type: string) =>
		["application/rss+xml", "application/atom+xml"].includes(type);
	const convertToAbsolutePath = (url: string) => new URL(url, document.baseURI).href;

	const pageTitle = document.title;
	const faviconUrl = document.querySelectorAll("head link[rel~=icon]")[0]?.getAttribute("href");
	const feedUrl = [...document.querySelectorAll("head link[rel=alternate]")]
		.filter((feed) => isFeedType(feed.getAttribute("type")))
		.map((element) => element.getAttribute("href"))[0];

	return {
		pageTitle,
		faviconUrl: convertToAbsolutePath(faviconUrl),
		feedUrl: feedUrl ? convertToAbsolutePath(feedUrl) : null,
	};
};

const getCurrentTabFeeds = async () => {
	const currentTab = await getCurrentTab();
	const [{ result: feeds }] = await chrome.scripting.executeScript({
		target: { tabId: currentTab.id },
		func: extractFeedLinks,
	});

	return feeds;
};

export { getCurrentTabFeeds };
