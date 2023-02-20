function saveApiKey() {
  const apiKey = document.getElementById("apiKey").value;
  chrome.storage.sync.set({ apiKey: apiKey }, function () {
    console.log("API key saved:", apiKey);
  });
}

document
  .querySelector('input[type="submit"]')
  .addEventListener("click", saveApiKey);

chrome.storage.sync.get("apiKey", function (data) {
  const apiKey = data.apiKey;
  if (apiKey) {
    document.getElementById("apiKey").value = apiKey;
  }
});
