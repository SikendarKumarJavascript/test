const formDataSubmit = () => {
  e.preventDefault();
  const loader = document.querySelector(".loader-modal");
  const loaderImage = sessionStorage.getItem("discountium.exitpopup.loader");
  document.querySelector(".loader img").src = loaderImage;
  const storeLogo = sessionStorage.getItem("discountium.exitpopup.storeLogo");
  document.querySelector(".Logo").src = storeLogo;
  document.querySelector(".u-popup-container").style.display = "none";
  document.querySelector(".u-popup-container.thankYou").style.display = "none";
  document.querySelector("#shopify-section-popup-model").style.display = "none";
  loader.style.display = "flex";
  const name = document.getElementById("mce-USER").value;
  const email = document.getElementById("mce-EMAIL").value;
  const token = localStorage.getItem("discountium.exitpopup.token");
  const url = localStorage.getItem("discountium.exitpopup.url");
  const shop_token = "Bearer " + token;
  (async () => {
    try {
      const rawResponse = await fetch(`https://${url}/api/proxy`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: shop_token,
        },
        body: JSON.stringify({ name: name, email: email }),
      });
      const content = await rawResponse.json();
      if (content?.code) {
        const mainThank = document.querySelector(".u-popup-container.thankYou");
        sessionStorage.setItem(
          "discountium.exitpopup.discountCode",
          content.code
        );
        mainThank.style.display = "block";
        document.querySelector("#shopify-section-popup-model").style.display =
          "flex";
        document.querySelector(".coupon-code").value = content.code;
        loader.style.display = "none";
      } else {
        document.querySelector(".u-popup-container").style.display = "block";
        let messageError = document.querySelector(".error-message-email");
        messageError.innerHTML = content.message;
        messageError.style.display = "block";
      }
    } catch (error) {
      console.error(error);
    } finally {
      loader.style.display = "none";
    }
  })();
};


let reopenIcon = document.querySelector("#discount_reopen-icon");

const handleClickThankYou = () => {
  document.querySelector("#shopify-section-popup-model").style.display = "none";
  document.querySelector(".u-popup-container.thankYou").style.display = "none";
  reopenIcon.style.display = "block";
  popupState = "closed";
  localStorage.setItem("popupState", popupState);
};

const handleClick = () => {
  document.querySelector("#shopify-section-popup-model").style.display = "none";
  document.querySelector(".u-popup-container").style.display = "none";
  reopenIcon.style.display = "block";
  popupState = "closed";
  localStorage.setItem("popupState", popupState);
};

