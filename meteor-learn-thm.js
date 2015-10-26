Links = new Mongo.Collection("links");

Meteor.methods({
  addLink:function(link, description, type){
    // Check for valid input
    //TODO: check for valid url.
    if(link === "" || description === ""){
      console.log("Invalid entry.");
      return;
    }

    // Insert a links into the collection
    Links.insert({
      description: description,
      link: link,
      type: type,
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
  Houston.methods("links", {
  "Reset Type": function (link) {
    Links.update(link._id, {$set: {type: "Select type."}});
    return "add type success";
  }
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
      var type        = event.target.type.value;
      if (type ==="Select type.") {
        type = null;
      }
      //Add Link via Meteor method
      Meteor.call("addLink", link, description, type);

      // Clear form
      event.target.description.value = "";
      event.target.link.value = "";
      event.target.type.value = "Select type.";
    }
  });
}
