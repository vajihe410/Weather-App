const form=document.querySelector("form");
const input=document.querySelector("form input");
const msg=document.querySelector(".massage")
const ul=document.querySelector("ul")

const apiKey="edc228562ac0a8aa3116d41c0687cf56";
form.addEventListener("submit",e=>{
    e.preventDefault();
    let inputValue=input.value;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response=>response.json())
        .then(data=>{
            const {main,name,sys,weather} =data;
            const icon=`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const li=document.createElement("li");
            li.classList.add("city");
            const card=`
            <h1>
                <span >${name}</span>
                <span >${sys.country}</span>
            </h1>
            <p >${Math.round(main.temp)}</p>
            <figure>
                <img src=${icon} alt="">
                <figcaption >${weather[0].description}</figcaption>
            </figure>
            `
            li.innerHTML=card;
            ul.appendChild(li)
            msg.innerText=""
        })
        .catch(()=>{
            msg.innerText="Please search for a valid city"
        }
        )
        input.value=""
})
