"use strict";

const form = document.querySelector("#search-bar");
const input = document.querySelector('[name = "search"]');
const body = document.querySelector("body");

const doGet = async (searchValue) => {
    try {
        const reaction = await fetch(
            `https://api.tvmaze.com/search/shows?q= ${searchValue}`
        );
        if (reaction.ok) {
            const info = await reaction.json();
            const arrayLength = info.length;
            console.log(info.length);
            console.log(info[0]);

            for (let j = 0; j < arrayLength; j++) {
                console.log(info[j]);

                const img =
                    info[j].show.image == null ? "http://placekitten.com/g/200/300" : info[j].show.image.medium;

                body.innerHTML += `
            <div>
              <h1>Name: ${info[j].show.name}</h1>
              <img src="${img}" alt="Movie Poster"/><br> 
              <a href="${info[j].show.officialSite}">Official Page</a>
              <p> Brief-Info: ${info[j].show.summary}</p>
            </div >
            `;
            }

        } else {
            console.log("info cannot be accesed");
        }
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const inputVal = input.value;
    doGet(inputVal);
});