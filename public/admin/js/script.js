// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  let time = showAlert.getAttribute("data-time");
  time = parseInt(time);

  // Sau time giây sẽ đóng thông báo
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  // Khi click vào nút close-alert sẽ đóng luôn
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}

// End Show Alert
// Sider 
const activeSider = document.querySelector("[sider]")
if (activeSider) {
  let href = window.location.href;
  const activeLi = href.split("/")[4].split("?")[0]

  if (activeLi == "roles") {
    if (href.split("/")[5] == "permissions") {
      const listLi = activeSider.querySelector(`li[${href.split("/")[5]}]`);
      listLi.classList.add("active")
    } else {
      const listLi = activeSider.querySelector(`li[${activeLi}]`);
      listLi.classList.add("active")
    }
  } else {
    const listLi = activeSider.querySelector(`li[${activeLi}]`);
    if (listLi) {
      listLi.classList.add("active")
    }

  }

}
// End Sider 
// Button filter status 
const listButtonFilter = document.querySelectorAll("[button-status]");
if (listButtonFilter.length > 0) {
  const url = new URL(window.location.href);
  listButtonFilter.forEach((button) => {
    button.addEventListener("click", () => {
      const dataStatus = button.getAttribute("button-status");
      if (dataStatus) {
        url.searchParams.set("status", dataStatus)
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    })
  })
}
// End Button filter status 
//Search
const search = document.querySelector("input[name='keyword']");
if (search) {
  const url = new URL(window.location.href);
  if (url.searchParams.get("keyword") == "") {
    url.searchParams.delete("keyword");
    window.location.href = url.href;
  }
}
//End Search