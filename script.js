const hoursText =  document.getElementsByClassName("time");
const previousText = document.getElementsByClassName("time-slot");

const cardElements = document.getElementsByClassName("card");

const settingsButtons = document.getElementsByClassName("settings-button");

const cardObjects = [];

const periodText = {
    daily: "Yesterday - ",
    weekly: "Last week - ",
    monthly: "Last month - ",
};

let dataArray;

window.onload = function()
{
    fetch('data.json').then((data) => 
    {
        data.json().then((object) =>
        {
            dataArray = object;
            hasFetchedData(dataArray);
            console.log(dataArray);
        })
    });
}


function hasFetchedData(object)
{
    for(let i = 0; i < cardElements.length; i++)
        {
            if(cardElements[i].dataset.field === "")
                cardObjects.push({title: cardElements[i].id,current: hoursText[i-1], previous: previousText[i-1],});
        }
    console.log(cardObjects);

    for(let i = 0; i < settingsButtons.length; i++)
        {
            settingsButtons[i].addEventListener("click", function() 
            {
                changeUI(event, this.id);
            });
        }
}


function changeUI(event, period)
{
    if(!event.currentTarget.classList.contains("checked"))
    {
        for(let i = 0; i < cardObjects.length; i++)
        {
            let array = Object.values(dataArray[i].timeframes[period]);
            cardObjects[i].current.textContent = array[0] + "hrs";
            cardObjects[i].previous.textContent = periodText[period] + array[1] + "hrs" 
        }

        for(let i = 0; i < settingsButtons.length; i++)
            {
                settingsButtons[i].classList.remove("checked");
            }
        
        event.currentTarget.classList.add("checked");
    }
    else return;
}