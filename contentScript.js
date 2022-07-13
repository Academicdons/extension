(() => {
    let totalAllowedCounts  = 50;
    let parentDivs, sectionID, searchTerm, firstTweetID, myUsername, tabID;
    let searchParameters = {};
    console.log('hello');
    // checkForTweetsSearched()

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // console.log(request)
        let { type, tabid } = request;

        if (type === "NEW") {
            console.log("setting running to running")
            tabid = tabid;
            tabID = tabid;
            console.log('Got a message of type : ' +
                type + 'on tab ID : ' + tabid);

            const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));

            // using async/await in top level
            (async function () {
                const msg = await sleep(10000);
                console.log(msg);
                if (totalAllowedCounts > 0) {
                    console.log('Restarting')
                    checkForParentDiv();
                    --totalAllowedCounts;
                }
            })()
            sendResponse({ response: "goodbye" });
        }
    });


    const checkForParentDiv = () => {

        parentDivs = document.getElementsByClassName("will-animate")
        let parentDivCount = parentDivs.length;
        // tweetQuery = document.getElementsByClassName("column-title-edit-box")
        for (let i = 0; i < parentDivCount; i++) {
            getsearchParams(parentDivs[i]);
        };
        // console.log('Restarting')
        const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));

        // using async/await in top level
        (async function () {
            const msg = await sleep(20000);
            console.log(msg);
            if (totalAllowedCounts > 0) {
                console.log('Restarting')
                checkForParentDiv();
                --totalAllowedCounts;
            }
            // checkForParentDiv();
        })()
    };

    const getsearchParams = (parentDiv) => {
        // let searchTerm = parentDiv.innerHTML
        try {
            searchTerm = parentDiv.querySelector('.column-title-edit-box').value;
            // let typeId = parentDiv.querySelector('.column-title-edit-box')[0];
            sectionID = parentDiv.querySelector('.chirp-container').getAttribute('data-column');
            let typeIdDiv = parentDiv.querySelector('.chirp-container');
            let firstchild = typeIdDiv.querySelector('.stream-item');
            myUsername = parentDiv.querySelector('.username').value;
            firstTweetID = firstchild.getAttribute('data-tweet-id');
            
        }catch(err) {
            console.log('Error found while getting getsearchParams')
            checkForParentDiv();          
        }

        // First check if the parentDiv is new
        let sectionIdFound = false;
        for (let prop in searchParameters) {
            if (sectionID === prop && sectionIdFound == false) {
                console.log(prop + ": ", searchParameters[prop].firstTweetID);
                // Meaning the parentDiv already exists in searchParameters;
                sectionIdFound = true;
                // now check if the first tweetId is same
                if (searchParameters[prop].firstTweetID === firstTweetID) {
                    // nothing has changed
                } else {
                    // update the tweet id
                    console.log("New tweet found for " + prop);
                    searchParameters[prop].firstTweetID = firstTweetID;
                    chrome.runtime.sendMessage({
                        type : 'NEW', 
                        sectionID : sectionID,
                        searchTerm : searchTerm,
                        tweetID : firstTweetID,
                        myUsername : myUsername
                        
                    }, function (response) {
                        console.dir('response');
                    });
            
                }
            }
        }
        if (sectionIdFound === false) {
            // Meaning this is a new search tab 
            console.log('Found a new tab :' + sectionID)
            searchParameters[sectionID] = {
                "searchTerm": searchTerm,
                "firstTweetID":firstTweetID
            }    
        }
    };

 
})();