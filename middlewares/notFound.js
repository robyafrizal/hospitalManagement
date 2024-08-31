//Menghandle error jika endpoint belum dibuat
const not_found = (req, res, next) => {
  res.status(404).json({ status: "Failed", errors: "Not Found" });
};

module.exports = not_found;
