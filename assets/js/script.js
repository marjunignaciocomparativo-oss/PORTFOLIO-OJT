'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// page navigation variables
// Navigation is driven by matching data-nav-target (on any [data-nav-link])
// to data-page (on the <article> to show). This lets the same target be
// triggered by the navbar AND by "quick link" cards inside a page.
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const activatePage = function (target) {
  pages.forEach(function (page) {
    page.classList.toggle("active", page.dataset.page === target);
  });

  navigationLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.navTarget === target);
  });

  window.scrollTo(0, 0);
};

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    activatePage(this.dataset.navTarget);
  });
});

// gallery lightbox variables
// Reused across Infographics, Event Poster and Documentary Photos sections.
const galleryLightbox = document.querySelector("[data-gallery-lightbox]");
const galleryLightboxImg = document.querySelector("[data-gallery-lightbox-img]");
const galleryLightboxCaption = document.querySelector("[data-gallery-lightbox-caption]");
const galleryLightboxClose = document.querySelector("[data-gallery-lightbox-close]");
const galleryTriggers = document.querySelectorAll("[data-gallery-item]");

const openGalleryLightbox = function (imgSrc, imgAlt, caption) {
  galleryLightboxImg.setAttribute("src", imgSrc);
  galleryLightboxImg.setAttribute("alt", imgAlt);
  galleryLightboxCaption.textContent = caption;
  elementToggleFunc(galleryLightbox);
  document.body.style.overflow = "hidden";
}

const closeGalleryLightbox = function () {
  galleryLightbox.classList.remove("active");
  document.body.style.overflow = "";
}

galleryTriggers.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const img = this.querySelector("img");
    if (!img) return;
    const caption = this.dataset.caption || img.getAttribute("alt") || "";
    openGalleryLightbox(img.getAttribute("src"), img.getAttribute("alt"), caption);
  });
});

if (galleryLightboxClose) {
  galleryLightboxClose.addEventListener("click", closeGalleryLightbox);
}

if (galleryLightbox) {
  galleryLightbox.addEventListener("click", function (event) {
    if (event.target === galleryLightbox) closeGalleryLightbox();
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeGalleryLightbox();
});
