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
        let data =  {
                tweetID : tweetID,
                searchTerm : searchTerm
            }
        
        newTweets[sectionID] = data
        // newTweets.push(data)
        let from = 'NotDOM'
        await resetNewTweets (from, tweetID, searchTerm, myUsername )
        sendResponse({ response: "goodbye" });
    }
});

let createElements = (tweetIdentity,searchTermUsed, myUsername) =>{

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
    searchTermPhrase.textContent = searchTermUsed
    let viewBut = document.createElement('a')
    let viewButton = document.createElement('button')
    viewButton.className = 'button'
    viewButton.value = 'Open Tweet'
    // viewBut.appendChild(viewButton)
    viewBut.href = 'https://twitter.com/' + myUsername + '/status/'+ tweetIdentity + '/'
    viewBut.className = 'button'
    viewBut.target = "_blank"
    viewBut.innerHTML = 'Open Tweet'
    let finalViewButton = colDiv.appendChild(viewBut)

    

    dataDiv.appendChild(mainDiv)
    mainDiv.appendChild(containerDiv)
    containerDiv.appendChild(rowDiv)

    let finalDiv = rowDiv.appendChild(searchTermPhrase)
    finalDiv.appendChild(finalViewButton)
    removeLastDiv()
    
}
//adds new row of tweet in the index.html 
const resetNewTweets = (from, tweetID, searchTerm, myUsername) => {

    

    if(tweetID === undefined){
        console.log('tweetID is undefined')
        len = newTweets.length;
        console.log('Saved tweet count is '+ len )
        if(len>0){
            newTweetsDiv.style.display = "none";
            tableDiv.style.display = "";
            errorDiv.style.display = "none";
            for (let item in newTweets){
                let tweetIdentity = item.tweetID
                let searchTermUsed = item.searchTerm
                createElements(tweetIdentity,searchTermUsed, myUsername )
            }
        }else{
            newTweetsDiv.style.display = "";
            tableDiv.style.display = "none";
            errorDiv.style.display = "none";
        }
        // newTweetsDiv.style.display = "";
        // tableDiv.style.display = "none";
        // errorDiv.style.display = "none";

    }else{
        createElements(tweetID,searchTerm, myUsername )
    }
};

const removeLastDiv = () => {
    len = newTweets.length;
    if(len > 5){
        console.log('len > 5 reducin te no to five')
        let idToRemove = newTweets[0].tweetID
    //     let idToRemove = newTweets[len - len]
    // Array.prototype.removeByValue = function (val) {
    //     for (var i = 0; i < this.length; i++) {
    //       if (this[i] === val) {
    //         this.splice(i, 1);
    //         i--;
    //       }
    //     }
    //     return this;
    //   }
    delete newTweets[idToRemove]
    // newTweets.removeByValue(idToRemove);
    console.log('Id to remove is ' + idToRemove.tweetID)
    let subsWrapper = document.getElementById(idToRemove.tweetID);
    subsWrapper.remove();
    removeLastDiv()
    } else{
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