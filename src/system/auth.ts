const CLIENT_ID = '7704435';
const REDIRECT_URI = 'https://oauth.vk.com/blank.html';
const AUTH_BASE_LINK = 'https://oauth.vk.com/authorize';
const DISPLAY_TYPE = 'page';
const SCOPE = 'messages';
const NEEDED_RESPONSE_TYPE = 'token';

const options = {
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  display: DISPLAY_TYPE,
  scope: SCOPE,
  response_type: NEEDED_RESPONSE_TYPE,
};

let authActive = false;

export const auth = () => {
  if (!authActive) {
    authActive = true;
    localStorage.removeItem('token');
    const url = AUTH_BASE_LINK;
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => params.set(key, value));
    chrome.tabs.getCurrent((activeTab) => {
      if (activeTab && activeTab.id) {
        chrome.tabs.create({ url: `${url}?${params}` }, (newTab) => {
          chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (tabId === newTab.id && changeInfo.url) {
              // добавить сюда проверку что есть accessToken
              const url = new URL(changeInfo.url);
              const params = new URLSearchParams(url.hash.replace('#', ''));
              const token = params.get('access_token');
              if (token) {
                localStorage.setItem('token', token);
                chrome.tabs.reload(activeTab.id as number, {});
                chrome.tabs.update(activeTab.id as number, {
                  highlighted: true,
                });
                chrome.tabs.remove(tabId);
                authActive = false;
              }
            }
          });
        });
      }
    });
  }
};
