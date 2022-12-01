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
      coverImage {
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
      coverImage {
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
		<div>
			<img src="${img.coverImage.extraLarge}" alt="anime pic"></img>
		</div>
	`;
    container.insertAdjacentHTML("beforeend", html);
  });
};

const renderTopAnimes = function (data) {
  data.data.top.media.forEach((img, i) => {
    const html = `
           	<div> 
			<img src="${img.coverImage.extraLarge}" alt="anime pic"></img>
			<div><span>${i + 1}</span></div>
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
