module.exports = {
  buildRequestMessage: function (info) {
    return "Subscription request received for" +
      ' type: ' + info.type + ',' +
      ' name: ' + info.name + ',' +
      ' event: ' + info.event;
  },
  buildSuccessMessage: function(record) {
    return  'Subscription successfully created! Captain-Hook ID: ' + record.get('id') +
            ' Webhooks ID: ' + record.get('hook_id');
  },
  bookshelfCreateError: 'ARRGH! Bookshelf error creating subscription'
};
