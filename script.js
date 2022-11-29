const container = document.querySelector(".container");
const header = document.querySelector("header");

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

// observer.observe(header);

const renderData = async function (data) {
  data.data.Page.media.forEach(async (img) => {
    const html = `
		<div>
			<img src="${img.coverImage.extraLarge}"></img>
		</div>
	`;
    container.insertAdjacentHTML("beforeend", html);
  });
};

const query = `{
  Page(perPage: 10) {
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
}

`;

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

const getData = async function () {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  renderData(data);
};

getData();
