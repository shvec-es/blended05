export function createGalleryCard(images) {
  return images
    .map(
      ({ urls, alt_description }) =>
        `<a href="${urls.small}"><img src='${urls.small}' alt='${alt_description}'></a>`
    )
    .join('');
}
