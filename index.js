/*
 
*/
//let url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=rahulgandhi&key=AIzaSyCuGmSqN1mUzaDiKCIuKbgCPVfMwrCVNS4"

let searchinput = document.getElementById("search");
let card = document.getElementById("container-card")

const apikey ='AIzaSyCuGmSqN1mUzaDiKCIuKbgCPVfMwrCVNS4'

function searchvedio(){
    let searchvalue = searchinput.value ;
    fetchvedio(searchvalue);
} 

async function fetchvedio(searchvalue){
 
   let endpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchvalue}&key=${apikey}`;

  try{
    let response = await fetch(endpoint);
    let result = await response.json();
    console.log(result);
  for(let i=0;i<result.items.length;i++){
 
     let vedio = result.items[i];
     let vedioStats = await fetch(vedio.id.videoId)
     if(vedioStats.items.length>0)
     result.item[i].vedioStats = vedioStats;

   }
    showthumbanils(result.items);
   }
  catch{
     alert('something went wrong')
  }
}

function showthumbanils(items){
   for(let i = 0; i< items.length; i++){
        let vedioitem = items[i];
        let imgurl = vedioitem.snippet.thumbnails.high.url;
        let imginput = document.createElement("div");
  

        const vediochildern = `
          <img src="${imgurl}" />
          <p class="title">${vedioitem.snippet.title}</p>
          <p class="channal-name">${vedioitem.snippet.channelTitle}</p>
          <p class="channal-name">${vedioitem.vedioStats ? vedioitem.vedioStats.viewCount : "NA"}</p>
          <p class="channal-name">23 lack views . 10hr ago</p>
        `
        imginput.innerHTML = vediochildern;
        card.append(imginput)
   }
}  

  async function fetchStates(videoId){

    const endpoint = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apikey}`

    let response = await fetch(endpoint);
    let result = await response.json();
    console.log(result);
    
    return result
  }
 
  fetchStates();
/*
{
    "kind": "youtube#searchRes ult",
    "etag": "7F387wexFAK2yLomoNRJ8n2eaFI",
    "id": {
        "kind": "youtube#video",
        "videoId": "GXWfue9VhTY"
    },  
    "snippet": {
        "publishedAt": "2023-05-29T06:29:07Z",
        "channelId": "UCq-Fj5jknLsUf-MWSy4_brA",
        "title": "Ram Siya Ram (Hindi) Adipurush | Prabhas | Sachet-Parampara, Manoj Muntashir S | Om Raut | Bhushan K",
        "description": "Adipurush #RamSiyaRam ADIPURUSH CELEBRATING VICTORY OF GOOD OVER EVIL Gulshan Kumar and T-Series present A ...",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/GXWfue9VhTY/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/GXWfue9VhTY/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/GXWfue9VhTY/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "T-Series",
        "liveBroadcastContent": "none",
        "publishTime": "2023-05-29T06:29:07Z"
    }
}
*/

