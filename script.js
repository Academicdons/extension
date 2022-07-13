import { getCurrentTabURL } from  "./util.js"

let newTweets = {}
let len;
let newTweetsDiv = document.getElementsByClassName('newTweets')[0]
let tableDiv = document.getElementsByClassName('dataClass')[0]
let errorDiv = document.getElementsByClassName('error')[0]
let dataDiv = document.getElementsByClassName('dataArea')[0]

chrome.runtime.onMessage.addListener( async (request, sender, sendResponse) => {
    // console.log(request)
    let { type, sectionID, searchTerm, tweetID, myUsername } = request;

    if (type === "NEW") {
        console.log("New tweet: " + tweetID + ' found in section : ' + sectionID + ' with search phrase ' + searchTerm)
        let tweetIDDatta =  {
                tweetID : tweetID,
            }
        let searchTermData =  {
            searchTerm : searchTerm
        }
        // newTweets.assign(tweetIDDatta, searchTermData);
        // newTweets[sectionID] = data
        newTweets = newTweets
        newTweets.push(tweetIDDatta, searchTermData)
        let from = 'NotDOM'
        await resetNewTweets (from, tweetID, searchTerm, myUsername )
        sendResponse({ response: "goodbye" });
    }
});

let createElements = async (tweetIdentity,searchTermUsed, myUsername) =>{

    newTweetsDiv.style.display = "none";
    tableDiv.style.display = "";
    errorDiv.style.display = "none";

    let mainDiv = document.createElement('li')
    let containerDiv =  document.createElement('div')
    let rowDiv =  document.createElement('div')
    let colDiv =  document.createElement('div')
    containerDiv.className='container'
    rowDiv.className='row'
    colDiv.className='.col-md-6'

    rowDiv.id = tweetIdentity

    


    let searchTermPhrase = colDiv
    searchTermPhrase.textContent = ''
    let viewBut = document.createElement('a')
    let viewButton = document.createElement('button')
    viewButton.className = 'button'
    viewButton.value = 
    // viewBut.appendChild(viewButton)
    viewBut.href = 'https://twitter.com/' + myUsername + '/status/'+ tweetIdentity + '/'
    viewBut.className = 'button'
    viewBut.target = "_blank"
    viewBut.innerHTML = 'Search Phrase "' + searchTermUsed + '" '
    let finalViewButton = colDiv.appendChild(viewBut)

    

    dataDiv.appendChild(mainDiv)
    mainDiv.appendChild(containerDiv)
    containerDiv.appendChild(rowDiv)

    let finalDiv = rowDiv.prepend(finalViewButton)
    // finalDiv.appendChild(finalViewButton)
    removeLastDiv()

    
}
//adds new row of tweet in the index.html 
const resetNewTweets = (from, tweetID, searchTerm, myUsername) => {

    

    if(tweetID === undefined){
        console.log('tweetID is undefined')
 
        newTweetsDiv.style.display = "none";
        tableDiv.style.display = "";
        errorDiv.style.display = "none";

        //get from chrome storage
        chrome.storage.sync.get(['key'], function(result) {
            console.log('Value currently is ' + result.key);
            newTweets = result.key
            });

        len = newTweets.length;
        console.log("Found Chrome Storage to be having a count of " + len)
        if( len >  0){
            for (let item in newTweets){
                let tweetIdentity = item.tweetID
                let searchTermUsed = item.searchTerm
                createElements(tweetIdentity,searchTermUsed, myUsername )
            }
        } else {
            console.log('Database doesnt have anything yet')
            newTweetsDiv.style.display = "";
            tableDiv.style.display = "none";
            errorDiv.style.display = "none";
        }
            
        
    }else{
        createElements(tweetID,searchTerm, myUsername )
    }
};

const removeLastDiv = (tweet) => {
    len = newTweets.length;
    console.log('In the removeLastDiv newTweets length is :' +  JSON.stringify(newTweets))
    
    if(len > 5){
        console.log('len > 5 reducing the no to five')
        let idToRemove = newTweets[0].tweetID
        delete newTweets[idToRemove]

        dataDiv.removeChild(dataDiv.getElementsByTagName('li')[0])
    // newTweets.removeByValue(idToRemove);
        // console.log('Id to remove is ' + idToRemove.tweetID)
        // let subsWrapper = document.getElementById(idToRemove.tweetID);
        // subsWrapper.remove();
        removeLastDiv()
    } else{
        console.log('Saving newTweets ');
        let value = newTweets
        chrome.storage.sync.set({key: value}, function() {
            console.log('Value is set to ' + value);
        });
        console.log('new tweet count is less than 5 :'+ newTweets)
    }
}


const appendTweets = (tweet) => {
    newTweetsDiv.style.display = "none";
    tableDiv.style.display = "";
    errorDiv.style.display = "none";

    console.log('appending Tweet :' + JSON.stringify(tweet))

};


document.addEventListener("DOMContentLoaded", async () =>{
    const activeTab = await getCurrentTabURL();
    if (activeTab.url.includes("tweetdeck.twitter.com")){ 
        let from = 'DOM'
        resetNewTweets(from, undefined, undefined, undefined )
    }else{
        console.log('This is not twitterDeck')

        newTweetsDiv.style.display = "none";
        tableDiv.style.display = "none";
        errorDiv.style.display = "";
        
        
    }
});