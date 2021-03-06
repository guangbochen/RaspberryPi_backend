
define ([

    'highcharts',
    'underscore',
    'backbone',
    'text!templates/noises/index.html',
    'views/noises/_controlPanel',
    'highcharts_exporting',

], function (Highcharts, _, Backbone, NoisesTemplate, ControlPanelView, ignore1 ) {
  'use strict';

  var NoisesView = Backbone.View.extend({

    template: _.template (NoisesTemplate),

      /**
       * constructor
       */
      initialize: function () {
      },

      events: { 
        'click #refresh': 'refresh',
      },

      refresh : function () {
        // this.collection.fetch();
        // alertify.success('Refreshed temperatures successfully');
      },

      renderHighCharts : function () {
        this.$('#noise-container').highcharts({
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                events: {
                    load: function() {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = Math.ceil(Math.random() * 40) + 30;
                                // y = Math.random() * 40;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Kenary Noise Sensor'
            },
            // subtitle: {
            //     text: 'Date: 2003'
            // },
            xAxis: {
                // title: {
                //     enabled: true,
                //     // text: 'Date'
                // },
                type: 'datetime',
                tickPixelInterval: 150
                // startOnTick: true,
                // endOnTick: true,
                // showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Sound Pressure Level (dB)'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 50,
                y: 20,
                floating: true,
                backgroundColor: '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.y} dB at {point.x}'
                    }
                }
            },

            // series: [{
            //     name: 'decibels(dB)',
            //     color: 'rgba(223, 83, 83, .5)',
            //     data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
            //         [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2]]
            // }]
            series: [{
              name: 'decibels(dB)',
              color: 'rgba(223, 83, 83, .5)',
              data: (function() {
                // generate an array of random data
                var data = [],
              time = (new Date()).getTime(), i;

              for (i = -19; i <= 0; i++) {
                data.push({
                  x: time + i * 1000,
                  y: Math.random() * 30
                });
              }
              return data;
              })()
            }]
        });
      },

      /**
       * renders the view template, and updates this.el with the new HTML
       */
      render: function () {
        // Load the compiled HTML template into the Backbone
        this.$el.html (this.template());
        this.renderHighCharts();

        var controlPanelView = new ControlPanelView({id: 1});
        this.$el.find('#noises-control-panel').append(controlPanelView.render().el);

        this.$( "text" ).last().empty();
        return this;
      },

      onClose: function () { }
  });

  return NoisesView;
});

