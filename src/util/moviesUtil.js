exports.formatToUSD = (dollarAmount) => {
  // Ensure the input is a number and an integer
  if (typeof dollarAmount !== "number" || !Number.isInteger(dollarAmount)) {
    throw new TypeError("Input must be an integer");
  }

  // Convert the number to a string with US dollar formatting
  return `$${dollarAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

exports.formatGenres = (genres) => {
  const genresArray = JSON.parse(genres);
  const genresString = genresArray.map((genre) => genre.name).join(", ");
  return genresString;
};

exports.formatProductionCompanies = (productionCompanies) => {
  const productionCompaniesArray = JSON.parse(productionCompanies);
  const productionCompaniesString = productionCompaniesArray
    .map((company) => company.name)
    .join(", ");
  return productionCompaniesString;
};
