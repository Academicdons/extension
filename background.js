chrome.tabs.onUpdated.addListener( (tabId,changeInfo, tab)  => {
    
    const tabUrl =  tab.url;
    let infoStatus = changeInfo
    console.log(" URL '" + tabUrl + "'" )
    let link = 'https://tweetdeck.twitter.com/'
    if (tab.url.includes("tweetdeck.twitter.com")){
        console.log('Tab contains the word tweetdeck')
        if (changeInfo.status === "complete"){
            console.log("Tab '" + tabId + "' has twitterdeck opened" );
        
            chrome.tabs.sendMessage(tabId, {
                type : 'NEW',
                tabid : tabId
            }, (response) => {
                console.log(response.response);
            })
        }
        
    }
    else {
        console.log("Tab '" + tabId + "' has opened URL '" + tabUrl + "'" )
        chrome.tabs.sendMessage(tabId, {
            type : 'NEWs',
            tabid : tabId
        }, function(response) {
            console.log(response.response);
          })
    }
 }); 
 

// chrome.tabs.onUpdate.addListener((tabId, tab) =>{
    
// })