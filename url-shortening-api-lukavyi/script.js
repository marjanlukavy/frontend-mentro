const originUrl = document.getElementById("url");
const btn = document.getElementById("btn");
const loader = document.getElementById("loader");
const shortenUrl = document.getElementById("shortenUrl");
const error = document.getElementById("error");
btn.addEventListener("click", () => {
  loader.style.display = "block";
  const url = `https://api.shrtco.de/v2/shorten?url=${originUrl.value}`;
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      console.log("data", data);
      loader.style.display = "none";
      if (data.ok != false) {
        const result__column = document.createElement("div");
        result__column.classList.add("result__column");
        shortenUrl.appendChild(result__column);

        const url_container = document.createElement("div");
        url_container.classList.add("url-container");
        result__column.appendChild(url_container);
        const origion_url = document.createElement("a");
        origion_url.classList.add("origion-url");
        origion_url.href = originUrl.value;
        const origion_url_text = document.createTextNode(originUrl.value);
        origion_url.appendChild(origion_url_text);
        url_container.appendChild(origion_url);
        const shorten_url_span = document.createElement("a");
        shorten_url_span.href = data.result.short_link2;
        shorten_url_span.classList.add("shorten-url-span");
        const shorten_url_text = document.createTextNode(
          data.result.short_link2
        );
        shorten_url_span.appendChild(shorten_url_text);
        result__column.appendChild(shorten_url_span);
        const button = document.createElement("button");
        const btn_text = document.createTextNode("Copy");
        button.appendChild(btn_text);
        result__column.appendChild(button);
      } else {
        originUrl.style.border = "4px solid hsl(0, 87%, 67%)";
        originUrl.placeholder = "Please add a link"
        originUrl.placeholder.style.color = 'red'
      }
    });
  });
});
