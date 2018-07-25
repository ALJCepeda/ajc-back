const Util = {
  reduceRowsById: function(result) {
    return result.rows.reduce((res, row) => {
      res[row.id] = row;
      return res;
    }, {});
  }
};

export default Util;
