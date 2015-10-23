Links = new Mongo.Collection("links");

Meteor.methods({
  addLink:function(link, description){
    // Insert a links into the collection
    Links.insert({
      description: description,
      link: link,
      createdAt: new Date()
    });
  }
});

Router.route('/', function () {
  this.render('home');
});

if(Meteor.isServer){
  Meteor.publish("links", function(argument){
    return Links.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("links");

  Template.main.helpers({
    links: function () {
      return Links.find({}, {sort: {createdAt: -1}});
    }
  });
  Template.main.events({
    'submit .new-link': function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var description = event.target.description.value;
      var link        = event.target.link.value;

      //Add Link via Meteor method
      Meteor.call("addLink", link, description);

      // Clear form
      event.target.description.value = "";
      event.target.link.value = "";
    }
  });
}
