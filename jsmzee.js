(() => {
    let parentDivs, tweetQuery, storedData, running, sectionIDentification;
    let savedSections = [];
    console.log('hello');
    // checkForTweetsSearched()

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // console.log(request)
        let { type, tabid } = request

        if (type === "NEW") {
            console.log("setting running to running")
            running = 2
            tabid = tabid
            console.log('Got a message of type : ' +
                type + 'on tab ID : ' + tabid);

            const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));

            // using async/await in top level
            (async function () {
                const msg = await sleep(10000);
                console.log(msg);
                checkForParentDiv();
            })()
            sendResponse({ response: "goodbye" });
        }
    });
    



    const checkForParentDiv = () => {
        console.log("Checking for new Tweets");

        parentDivs = document.getElementsByClassName("will-animate")
        let parentDivCount = parentDivs.length;
        // tweetQuery = document.getElementsByClassName("column-title-edit-box")
        for (let i = 0; i < parentDivs.length; i++) {
            getsearchParams(parentDivs[i], i);
        };
        console.log()
        console.log('Done dealing with the for loop, checkForParentDiv again')
        console.log()
        console.log('Restarting')
        const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));

        // using async/await in top level
        (async function () {
            const msg = await sleep(5000);
            console.log(msg);
            console.log()
            console.log()
            checkForParentDiv();
        })()
        // checkForParentDiv();



    };
    const getsearchParams = (parentDiv, i) => {
        // let searchTerm = parentDiv.innerHTML
        try {
            let searchTerm = parentDiv.querySelector('.column-title-edit-box').value;
            // let typeId = parentDiv.querySelector('.column-title-edit-box')[0];
            let sectionID = parentDivs[i].querySelector('.chirp-container').getAttribute('data-column');
            let typeIdDiv = parentDivs[i].querySelector('.chirp-container')
            let firstchild = typeIdDiv.querySelector('.stream-item')
            let firstTwweetID = firstchild.getAttribute('data-tweet-id')
    

    
        }catch(err) {
            console.log('Error found : ' + err)
            checkForParentDiv()          
        }
        


        // anchors.push(searchTerm);
    };

    const checkfornewSearchTermEventHandler =  (searchTerm, sectionID, firstTwweetID) => {
        checkForNewTweetUpdate(searchTerm, sectionID, firstTwweetID)
        // const fetchSectionIds = (sectionID) => {
        //     return new Promise((resolve) => {
        //         chrome.storage.sync.get([sectionID], (obj) => {
        //             resolve(obj[sectionID] ? JSON.parse(obj[sectionID]) : [])
        //         });
    
        //     })
        // };

        // // console.log('In the checkfornewSearchTermEventHandler with anchors: ' + anchors);
        // let sectionParameters =  fetchSectionIds(sectionID)
        // console.log('checkfornewSearchTermEventHandler Fetched values are ' + sectionParameters)

        // if (sectionParameters.length = 0 ) {
        //     console.log('The section with id : ' + sectionID + ' is not in the database, saving Now')
        //     addNewSearchTermEventHandler(searchTerm, sectionID, firstTwweetID)
        // } else {
        //     console.log('The section with id : ' + sectionID + ' Is in the Database Proceeding to check if the first tweet Ids match')
        //     checkForNewTweetUpdate(searchTerm, sectionID, firstTwweetID)
        // }
        // addNewSearchTermEventHandler ();
    }

    
    
    const addNewSearchTermEventHandler = (searchTerm, sectionID, firstTwweetID) => {
        let value = {
            sectionID: sectionID,
            searchTerm: searchTerm,
            firstTwweetID: firstTwweetID
        }

        chrome.storage.sync.set({
            [sectionID]: JSON.stringify([ value ])
            
        });
        console.log('Value saved while saving new section is ' +  value.searchTerm + ' and ' + value.firstTwweetID );
    };

    const checkForNewTweetUpdate =  (searchTerm, sectionID, firstTwweetID) => {
        chrome.storage.sync.get([sectionID], (data) => {
            const savedSectionData = data[sectionID] ? JSON.parse(obj[sectionID]) : []
            console.log('savedSectionData' + savedSectionData)
            return viewSavedTweets(savedSectionData)
        })
        const viewSavedTweets = (savedSectionData=[]) =>{
            console.log('checkForNewTweetUpdate')
            console.log(savedSectionData)
        }
        
        
    }


})();