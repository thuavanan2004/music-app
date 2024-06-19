export const index = (req, res) => {
  res.render("./admin/pages/dashboard", {
    pageTitle: "Tổng quan",
  });
};
