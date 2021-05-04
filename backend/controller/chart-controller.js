const axios = require("axios").default;
const _ = require("underscore");
const moment = require("moment");
var lodash = require("lodash");

const getDates = (requestParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await axios.get("http://45.79.111.106/interview.json");
      data = data.data;
      console.log("requestParams", requestParams);

      if (
        !_.isEmpty(requestParams.startDate) &&
        !_.isEmpty(requestParams.endDate)
      ) {
        let dateFilterData = [];
        let startDate = requestParams.startDate.split("-");
        let endDate = requestParams.endDate.split("-");

        startDate = new Date(startDate[0], startDate[1], startDate[2]);
        endDate = new Date(endDate[0], endDate[1], endDate[2]);

        console.log([{ startDate: startDate, endDate: endDate }]);
        for (let x in data) {
          data[x].date = moment(data[x].date).format("YYYY-MM-DD");

          if (
            moment(data[x].date).isBetween(
              moment(startDate).format("YYYY-MM-DD"),
              moment(endDate).format("YYYY-MM-DD"),
              null,
              "[]"
            ) ||
            moment(data[x].date).format("YYYY-MM-DD") ==
              moment(startDate).format("YYYY-MM-DD") ||
            moment(data[x].date).format("YYYY-MM-DD") ==
              moment(endDate).format("YYYY-MM-DD")
          ) {
            dateFilterData.push(data[x]);
          }
        }

        let filterData = await FilterResponse(dateFilterData);

        resolve(filterData);
        return;
      } else {
        let filterData = await FilterResponse(data);
        resolve(filterData);
        return;
      }
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const FilterResponse = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let result = [];
      let websiteIdList = _.pluck(data, "websiteId");
      let uniqeWebsiteIDList = _.union(websiteIdList);
      let filterDataList = [];
      for (let x of uniqeWebsiteIDList) {
        let findIdData = _.where(data, { websiteId: x });
        if (!_.isEmpty(findIdData)) {
          let obj = {
            websiteId: x,
            chats: lodash.sumBy(findIdData, "chats"),
            missedChats: lodash.sumBy(findIdData, "chats"),
            totalWebsiteEntry: Object.keys(findIdData).length,
          };
          filterDataList.push(obj);
        }
      }
      resolve(filterDataList);
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};
module.exports = {
  getDates,
  FilterResponse,
};
