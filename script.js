const container = document.querySelector(".container");

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
