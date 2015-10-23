Links = new Mongo.Collection("links");

if (Meteor.isClient) {

  Template.main.helpers({
    links: function () {
      return Links.find({});
    }
  });

  Template.main.events({
    'submit .new-link': function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var description = event.target.description.value;
      var link        = event.target.link.value;

      // Insert a links into the collection
      Links.insert({
        description: description,
        link: link,
        createdAt: new Date()
      });

      // Clear form
      event.target.description.value = "";
      event.target.link.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
