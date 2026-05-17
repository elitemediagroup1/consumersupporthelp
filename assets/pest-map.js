(function() {
  var coverage = {
    'Washington': { url: '/pest-control/washington/', cities: [
      {name:'Seattle',url:'/pest-control/washington/seattle/'},
      {name:'Spokane',url:'/pest-control/washington/spokane/'},
      {name:'Vancouver',url:'/pest-control/washington/vancouver/'}
    ]},
    'Illinois': { url: '/pest-control/illinois/', cities: [
      {name:'Chicago',url:'/pest-control/illinois/chicago/'}
    ]},
    'Ohio': { url: '/pest-control/ohio/', cities: [
      {name:'Cleveland',url:'/pest-control/ohio/cleveland/'},
      {name:'Columbus',url:'/pest-control/ohio/columbus/'},
      {name:'Cincinnati',url:'/pest-control/ohio/cincinnati/'},
      {name:'Akron',url:'/pest-control/ohio/akron/'}
    ]},
    'Michigan': { url: '/pest-control/michigan/', cities: [
      {name:'Detroit',url:'/pest-control/michigan/detroit/'}
    ]},
    'Indiana': { url: '/pest-control/indiana/', cities: [
      {name:'Indianapolis',url:'/pest-control/indiana/indianapolis/'},
      {name:'Fort Wayne',url:'/pest-control/indiana/fort-wayne/'}
    ]},
    'Wisconsin': { url: '/pest-control/wisconsin/', cities: [
      {name:'Milwaukee',url:'/pest-control/wisconsin/milwaukee/'}
    ]},
    'Pennsylvania': { url: '/pest-control/pennsylvania/', cities: [
      {name:'Pittsburgh',url:'/pest-control/pennsylvania/pittsburgh/'},
      {name:'Philadelphia',url:'/pest-control/pennsylvania/philadelphia/'}
    ]},
    'Maryland': { url: '/pest-control/maryland/', cities: [
      {name:'Baltimore',url:'/pest-control/maryland/baltimore/'}
    ]},
    'Kentucky': { url: '/pest-control/kentucky/', cities: [
      {name:'Louisville',url:'/pest-control/kentucky/louisville/'}
    ]},
    'Virginia': { url: '/pest-control/virginia/', cities: [
      {name:'Richmond',url:'/pest-control/virginia/richmond/'},
      {name:'Virginia Beach',url:'/pest-control/virginia/virginia-beach/'},
      {name:'Norfolk',url:'/pest-control/virginia/norfolk/'}
    ]},
    'Minnesota': { url: '/pest-control/minnesota/', cities: [
      {name:'Minneapolis',url:'/pest-control/minnesota/minneapolis/'}
    ]},
    'Connecticut': { url: '/pest-control/connecticut/', cities: [
      {name:'Hartford',url:'/pest-control/connecticut/hartford/'}
    ]},
    'New Jersey': { url: '/pest-control/new-jersey/', cities: [
      {name:'Newark',url:'/pest-control/new-jersey/newark/'},
      {name:'Trenton',url:'/pest-control/new-jersey/trenton/'}
    ]},
    'Arizona': { url: '/pest-control/arizona/', cities: [
      {name:'Phoenix',url:'/pest-control/arizona/phoenix/'},
      {name:'Mesa',url:'/pest-control/arizona/mesa/'},
      {name:'Chandler',url:'/pest-control/arizona/chandler/'},
      {name:'Gilbert',url:'/pest-control/arizona/gilbert/'},
      {name:'Glendale',url:'/pest-control/arizona/glendale/'},
      {name:'Scottsdale',url:'/pest-control/arizona/scottsdale/'},
      {name:'Tempe',url:'/pest-control/arizona/tempe/'}
    ]},
    'Texas': { url: '/pest-control/texas/', cities: [
      {name:'Houston',url:'/pest-control/texas/houston/'},
      {name:'Dallas',url:'/pest-control/texas/dallas/'},
      {name:'San Antonio',url:'/pest-control/texas/san-antonio/'},
      {name:'Austin',url:'/pest-control/texas/austin/'},
      {name:'Fort Worth',url:'/pest-control/texas/fort-worth/'}
    ]},
    'Nevada': {
      url: '/pest-control/nevada/',
      cities: [
        {name:'Las Vegas', url:'/pest-control/nevada/las-vegas/'},
        {name:'Henderson', url:'/pest-control/nevada/henderson/'},
        {name:'North Las Vegas', url:'/pest-control/nevada/north-las-vegas/'}
      ]
    },
    'Tennessee': {
      url: '/pest-control/tennessee/',
      cities: [
        {name:'Nashville', url:'/pest-control/tennessee/nashville/'},
        {name:'Memphis', url:'/pest-control/tennessee/memphis/'},
        {name:'Knoxville', url:'/pest-control/tennessee/knoxville/'},
        {name:'Chattanooga', url:'/pest-control/tennessee/chattanooga/'}
      ]
    },
    'North Carolina': {
      url: '/pest-control/north-carolina/',
      cities: [
        {name:'Charlotte', url:'/pest-control/north-carolina/charlotte/'},
        {name:'Raleigh', url:'/pest-control/north-carolina/raleigh/'}
      ]
    },
    'Georgia': {
      url: '/pest-control/georgia/',
      cities: [
        {name:'Atlanta', url:'/pest-control/georgia/atlanta/'},
        {name:'Savannah', url:'/pest-control/georgia/savannah/'},
        {name:'Augusta', url:'/pest-control/georgia/augusta/'}
      ]
    }
  };
  var nameMap = {
    '01':'Alabama','02':'Alaska','04':'Arizona','05':'Arkansas',
    '06':'California','08':'Colorado','09':'Connecticut','10':'Delaware',
    '11':'District of Columbia','12':'Florida','13':'Georgia','15':'Hawaii',
    '16':'Idaho','17':'Illinois','18':'Indiana','19':'Iowa','20':'Kansas',
    '21':'Kentucky','22':'Louisiana','23':'Maine','24':'Maryland',
    '25':'Massachusetts','26':'Michigan','27':'Minnesota','28':'Mississippi',
    '29':'Missouri','30':'Montana','31':'Nebraska','32':'Nevada',
    '33':'New Hampshire','34':'New Jersey','35':'New Mexico','36':'New York',
    '37':'North Carolina','38':'North Dakota','39':'Ohio','40':'Oklahoma',
    '41':'Oregon','42':'Pennsylvania','44':'Rhode Island','45':'South Carolina',
    '46':'South Dakota','47':'Tennessee','48':'Texas','49':'Utah',
    '50':'Vermont','51':'Virginia','53':'Washington','54':'West Virginia',
    '55':'Wisconsin','56':'Wyoming'
  };
  function initMap() {
    var container = document.getElementById('pest-coverage-map');
    if (!container) return;
    if (typeof d3 === 'undefined' || typeof topojson === 'undefined') {
      setTimeout(initMap, 100);
      return;
    }
    var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var liveColor = '#1D9E75';
    var liveHover = '#0F6E56';
    var baseColor = isDark ? '#2C2C2A' : '#e0e0e0';
    var baseHover = isDark ? '#444441' : '#cccccc';
    var strokeColor = isDark ? '#1a1a1a' : '#ffffff';
    container.innerHTML = '';
    var tooltip = document.createElement('div');
    tooltip.id = 'map-tooltip';
    tooltip.style.cssText = 'display:none;position:absolute;background:#fff;border:1px solid #ddd;border-radius:6px;padding:8px 12px;font-size:13px;pointer-events:none;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,0.1)';
    container.style.position = 'relative';
    container.appendChild(tooltip);
    var mapDiv = document.createElement('div');
    container.appendChild(mapDiv);
    var legend = document.createElement('div');
    legend.style.cssText = 'display:flex;gap:16px;margin-top:12px;flex-wrap:wrap;font-size:12px;color:#666;justify-content:center';
    legend.innerHTML = '<span style="display:flex;align-items:center;gap:6px"><span style="width:12px;height:12px;border-radius:2px;background:#1D9E75;display:inline-block"></span>Live â click to explore</span><span style="display:flex;align-items:center;gap:6px"><span style="width:12px;height:12px;border-radius:2px;background:' + baseColor + ';display:inline-block;border:1px solid #ccc"></span>Coming soon</span>';
    container.appendChild(legend);
    var panel = document.createElement('div');
    panel.style.cssText = 'display:none;margin-top:16px;background:#f8f8f6;border-radius:10px;border:1px solid #e0e0e0;padding:16px 20px';
    container.appendChild(panel);
    var svg = d3.select(mapDiv).append('svg')
      .attr('viewBox', '0 0 960 580')
      .attr('width', '100%')
      .style('display', 'block');
    var path = d3.geoPath(
      d3.geoAlbersUsa().scale(1200).translate([480, 300])
    );
    d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(function(us) {
        var features = topojson.feature(us, us.objects.states).features;
        svg.selectAll('path')
          .data(features)
          .join('path')
          .attr('d', path)
          .attr('fill', function(d) {
            var name = nameMap[String(d.id).padStart(2,'0')];
            return coverage[name] ? liveColor : baseColor;
          })
          .attr('stroke', strokeColor)
          .attr('stroke-width', 0.8)
          .style('cursor', function(d) {
            var name = nameMap[String(d.id).padStart(2,'0')];
            return coverage[name] ? 'pointer' : 'default';
          })
          .on('mouseover', function(event, d) {
            var name = nameMap[String(d.id).padStart(2,'0')];
            var isLive = !!coverage[name];
            d3.select(this).attr('fill', isLive ? liveHover : baseHover);
            tooltip.style.display = 'block';
            if (isLive) {
              var c = coverage[name];
              tooltip.innerHTML = '<strong>' + name + '</strong><br><span style="color:#1D9E75;font-size:12px">' + c.cities.length + ' cit' + (c.cities.length !== 1 ? 'ies' : 'y') + ' covered â click to explore</span>';
            } else {
              tooltip.innerHTML = '<span style="color:#999;font-size:12px">' + name + ' â coming soon</span>';
            }
            var rect = container.getBoundingClientRect();
            tooltip.style.left = (event.clientX - rect.left + 12) + 'px';
            tooltip.style.top = (event.clientY - rect.top - 10) + 'px';
          })
          .on('mousemove', function(event) {
            var rect = container.getBoundingClientRect();
            tooltip.style.left = (event.clientX - rect.left + 12) + 'px';
            tooltip.style.top = (event.clientY - rect.top - 10) + 'px';
          })
          .on('mouseout', function(event, d) {
            var name = nameMap[String(d.id).padStart(2,'0')];
            d3.select(this).attr('fill', coverage[name] ? liveColor : baseColor);
            tooltip.style.display = 'none';
          })
          .on('click', function(event, d) {
            var name = nameMap[String(d.id).padStart(2,'0')];
            if (!coverage[name]) return;
            var c = coverage[name];
            panel.style.display = 'block';
            var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
            html += '<strong style="font-size:15px">' + name + ' pest control</strong>';
            html += '<button onclick="this.closest(\'div\').parentElement.style.display=\'none\'" style="background:none;border:none;cursor:pointer;color:#999;font-size:13px">close</button>';
            html += '</div><div style="display:flex;flex-wrap:wrap;gap:8px">';
            html += '<a href="' + c.url + '" style="display:inline-block;padding:7px 16px;border-radius:6px;background:#1D9E75;color:#fff;font-size:13px;text-decoration:none;font-weight:500">View all ' + name + '</a>';
            c.cities.forEach(function(city) {
              html += '<a href="' + city.url + '" style="display:inline-block;padding:7px 16px;border-radius:6px;border:1px solid #ddd;font-size:13px;color:#333;text-decoration:none;background:#fff">' + city.name + '</a>';
            });
            html += '</div>';
            panel.innerHTML = html;
            panel.scrollIntoView({behavior:'smooth',block:'nearest'});
          });
        svg.append('path')
          .datum(topojson.mesh(us, us.objects.states, function(a,b) { return a !== b; }))
          .attr('fill', 'none')
          .attr('stroke', strokeColor)
          .attr('stroke-width', 0.5)
          .attr('d', path);
      });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();
