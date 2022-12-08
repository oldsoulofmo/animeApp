const container = document.querySelector(".container");
const container1 = document.querySelector(".container1");
const header = document.querySelector("header");
const main = document.querySelector("main");
const section1 = document.querySelector(".section1");
const h4 = document.querySelector("#trending");
const airings = document.querySelector("#airings");

// query scheme
const query = `
	{
trending: Page(perPage: 10) {
    media(type: ANIME, sort: [TRENDING_DESC]) {
      id
      title {
        english
        native
      }
	siteUrl
      coverImage {
	medium
	large
	extraLarge
      }
      genres
      startDate {
        year
        month
        day
      }
      status 
      format
      nextAiringEpisode {
        timeUntilAiring
      }
      averageScore
      countryOfOrigin
    }
  }
  top: Page(perPage: 10) {
    media(type: ANIME, sort: [SCORE_DESC]) {
      averageScore
      title {
        english
        native
      }
	siteUrl
      coverImage {
	medium
	large
	extraLarge
}	 
    }
  }
	  	}

`;

// querying options and url
const url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  };

let optionsIntersection = {
  root: null,
  threshold: 1,
  rootMargin: "-36px 0px 0px 0px",
};

const callback = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    header.style.opacity = 0.6;
  } else {
    header.style.opacity = "";
  }
};

let observer = new IntersectionObserver(callback, optionsIntersection);
observer.observe(h4);

const renderData = function (data) {
  data.data.trending.media.forEach((img, i) => {
    const html = `
	<div class="animeCard">
		<div class="animeCover">
			<a href="${data.data.trending.media[i].siteUrl}" target="_blank"><img src="${img.coverImage.extraLarge}" srcset="${img.coverImage.large} 230w,${img.coverImage.extraLarge}, 460w" sizes="(max-width:600px) 230px,460px" alt="anime pic"></img></a>
		</div>
		<a href="${data.data.trending.media[i].siteUrl}" target="_blank" class="animeTitle">${data.data.trending.media[i].title.english}</a>
	</div>
	`;
    container.insertAdjacentHTML("beforeend", html);
  });
};

const renderTopAnimes = function (data) {
  data.data.top.media.forEach((img, i) => {
    const html = `
	<div class="animeCard">
		<div class="animeCover">
		 <a href="${data.data.top.media[i].siteUrl}" target="_blank"><img src="${img.coverImage.extraLarge}" srcset="${img.coverImage.large} 230w,${img.coverImage.extraLarge}, 460w" sizes="(max-widt:600px) 230px,460px" alt="anime pic"></img></a>
		</div>
		<a href="${data.data.top.media[i].siteUrl}" target="_blank" class="animeTitle">${data.data.top.media[i].title.english}</a>
	</div>
	`;

    container1.insertAdjacentHTML("beforeend", html);
  });
};

const scopeRenderer = function (data) {
  data.data.trending.media.forEach((el) => {
    console.log(el);
    const html = `
            <div class="airing1">
              <img src=${el.coverImage.medium} alt="" />
              <div class="info">
                <div class="info-1">
                  <span>${el.title.english}</span>
                  <span>${el.title.native}</span>
                  <span>${el.format}</span>
                </div>
                <div class="info-2">
                  <span>${el.startDate.day} / ${el.startDate.month} / ${el.startDate.year} <em>(start date)</em> </span>
                  <span>${el.status} <em>(status)</em> </span>
                  <span>${el.genres[0]} / ${el.genres[1]} </span>
                </div>
                <div class="info-3">
                  <span>${el.nextAiringEpisode.timeUntilAiring} <em>(next episode)</em> </span>
                  <span>${el.averageScore} <em>(average score)</em> </span>
                  <span>${el.countryOfOrigin} <em>(country of origin)</em> </span>
                </div>
              </div>
	   </div>
		`;
    airings.insertAdjacentHTML("beforeend", html);
  });
};

const getData = async function () {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    renderData(data);
    renderTopAnimes(data);
    scopeRenderer(data);
  } catch (err) {
    console.error(err);
  }
};

getData();
