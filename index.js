var from2 = require('from2');
var concat = require('concat-stream');
var pipeline = require('readable-stream').pipeline;
var cloneable = require('cloneable-readable');

// Works like I expect
pipeline([
  from2([
    new Error('Error works!!')
  ]),
  concat(function(results) {
    console.log('concat', results);
  }),
], function(err) {
  console.log('done', err);
});

// Doesn't pass the error to the callback, concat callback gets called
pipeline([
  cloneable(from2([
    new Error('Error does not work')
  ])),
  concat(function(results) {
    console.log('concat', results);
  }),
], function(err) {
  console.log('No error?', err);
});
