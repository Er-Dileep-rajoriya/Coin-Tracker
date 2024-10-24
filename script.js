let url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let data = [];
let parentDiv = document.getElementById("parent-div");

function renderData(items) {
  // clear the already written data
  parentDiv.innerHTML = "";

  items.map((item, index) => {
    let innerDiv = document.createElement("tr");
    innerDiv.className = "row";
    let symbol = item.symbol;
    symbol = symbol.toString().toUpperCase();
    let percentage = item.price_change_percentage_24h;
    let addClass = "green";

    // console.log(typeof percentage, percentage);
    if (percentage <= 1) {
      addClass = "red";
      //   console.log(typeof percentage, percentage);
    }
    innerDiv.innerHTML = `<td>
        <img src="${item.image}" alt="" />&nbsp;&nbsp;
        ${item.name}</td>
              <td>${symbol}</td>
              <td>$${item.current_price}</td>
              <td>$${item.total_volume}</td>
              <td class="${addClass}">${item.price_change_percentage_24h}%</td>
              <td>mkt cap : $${item.market_cap}</td>`;

    parentDiv.append(innerDiv);
  });
}

async function getData() {
  try {
    let response = await fetch(url);
    let d = await response.json();
    data = [...d];
  } catch (err) {
    console.log(err);
  }

  renderData(data);
}

// search items
let searchBar = document.getElementById("search-bar");

searchBar.addEventListener("change", (e) => {
  let value = e.target.value.toLowerCase();

  console.log(value);

  let newData = data.filter((item) => item.name.toLowerCase().includes(value));

  renderData(newData);
});

// sort by percentage
let sortByPercentage = document.getElementById("sort-by-percentage");
let isAscending = true;

sortByPercentage.addEventListener("click", () => {
  // sort the data by percentage(item.price_change_percentage_24h)

  if (isAscending) {
    data.sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    );
  } else {
    data.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
  }

  isAscending = !isAscending;

  renderData(data);
});

// sort by mkt cap
let sortByMKT = document.getElementById("sort-by-mkt");
let isAscendingMKT = true;
sortByMKT.addEventListener("click", () => {
  if (isAscendingMKT) {
    data.sort((a, b) => a.market_cap - b.market_cap);
  } else {
    data.sort((a, b) => b.market_cap - a.market_cap);
  }

  isAscendingMKT = !isAscendingMKT;

  renderData(data);
});

getData();
