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

// Check Box Multi 
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const listInputCheckId = checkboxMulti.querySelectorAll("input[name='id']");
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      listInputCheckId.forEach(input => {
        input.checked = true;
      })
    } else {
      listInputCheckId.forEach(input => {
        input.checked = false;
      })
    }
  })
  listInputCheckId.forEach(input => {
    input.addEventListener("click", () => {
      const listInputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
      if (listInputChecked.length == listInputCheckId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    })
  })
}
// End Check Box Multi 

// Form Change Multi 
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  const inputChangeMulti = document.querySelector("input[name='ids']");
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    let ids = [];
    const value = formChangeMulti.querySelector("select[name='type']").value;
    const listInputChecked = document.querySelectorAll("input[name='id']:checked");
    listInputChecked.forEach(inputChecked => {
      const id = inputChecked.value;
      ids.push(id);
    })
    ids = ids.join(",");
    inputChangeMulti.value = ids;
    if (ids == "") {
      alert("Vui lòng chọn ít nhất một bản ghi!")
      return;
    }
    if (value == "delete-all") {
      const isConfirm = confirm("Bạn có chắc chắn xóa những bản ghi này không !")
      if (!isConfirm) {
        return;
      }
    }
    formChangeMulti.submit();
  })

}

// End Form Change Multi 
// Form Change Status 
const formChangeStatus = document.querySelector("[form-change-status]");
if (formChangeStatus) {
  const dataPath = formChangeStatus.getAttribute("data-path")
  const litButtonChangeStatus = document.querySelectorAll("[button-change-status]")
  litButtonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const dataId = button.getAttribute("data-id");
      const dataStatus = button.getAttribute("data-status");
      const action = `${dataPath}/${dataStatus}/${dataId}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    })
  })

}
// End Form Change Status 

// Image Preview 
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  const labelLogo = document.querySelector("label[for='avatar']");
  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      if (labelLogo) {
        labelLogo.style.display = "none";
      }
    }

  });
}
// End Image Preview 

// Form Delete 
const formDelete = document.querySelector("[form-delete]");
if (formDelete) {
  const buttonDelete = document.querySelector("[button-delete]");
  const dataPath = formDelete.getAttribute("data-path");
  const id = buttonDelete.getAttribute("data-id");
  buttonDelete.addEventListener("click", () => {
    const isConfirm = confirm("Bạn có chắc chắn xóa chủ đề chứ ?");
    if (!isConfirm) {
      return;
    }
    const action = `${dataPath}/${id}?_method=PATCH`;
    formDelete.action = action;
    formDelete.submit();
  })
}
// End Form Delete 
// Pagination 
const paginaiton = document.querySelector(".pagination")
if (paginaiton) {
  const listButtonPagination = document.querySelectorAll("[button-pagination]")
  const url = new URL(window.location.href);
  listButtonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const pageCurrent = button.getAttribute("button-pagination");
      url.searchParams.set("page", pageCurrent)
      window.location.href = url.href;
    })
  })
}
// End Pagination 