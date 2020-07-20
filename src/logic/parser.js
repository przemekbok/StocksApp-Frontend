export function parseDataForChart(data) {
  return data.map((line) => {
    let dateAndTime = line.date.split(" ");
    let date = dateAndTime[0].match(/\d+/g);
    if (dateAndTime[1] != undefined && dateAndTime[1] != "") {
      let time = dateAndTime[1].match(/\d+/g);
      line.date = new Date(
        date[0],
        date[1] - 1,
        date[2],
        time[0],
        time[1],
        time[2]
      );
    } else {
      line.date = new Date(date[0], date[1] - 1, date[2]);
    }
    line.split = "";
    line.dividend = "";
    line.absoluteChange = "";
    line.percentChange = "";
    return line;
  });
}

export function companyTagFromIsin() {
  return "";
}
