export async function getCurrentTabURL () {
    let querOptions = { active: true, currentWindow: true}
    let [tab] = await chrome.tabs.query(querOptions);
    return tab
}