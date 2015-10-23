Handlebars.registerHelper("formatTime", function(timestamp) {
  return moment(timestamp).format('dd, HH:mm');
});
Handlebars.registerHelper("whenFromNow", function(timestamp) {
  return moment(timestamp).from(TimeSync.serverTime());
});
