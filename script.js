const container = document.querySelector(".container");
const container1 = document.querySelector(".container1");
const header = document.querySelector("header");

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

// let optionsIntersection = {
//   root: container,
//   threshold: 1.0,
// };

// const callback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//     if (entry.isIntersecting) console.log("hi");
//   });
// };

// let observer = new IntersectionObserver(callback, optionsIntersection);

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

const getData = async function () {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    renderData(data);
    renderTopAnimes(data);
  } catch (err) {
    console.error(err);
  }
};

getData();
