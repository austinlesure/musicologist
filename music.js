const musicInfo = [];

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}
$('div.container').append('<div id=\'results\' class="row"></div>')
$('#getPlaylistBtn').click(function (event) {
  // TODO: Display a list of music.
  // You may use anything from musicInfo.
  $('div#results').empty();
    musicInfo.forEach(function(val){
    console.log(val);
    val = val.replace(/ /g,"+");
    console.log(val);
    $.get(`https://itunes.apple.com/search?term=${val}&limit=8`, function(data){
      data = JSON.parse(data);
      console.log(data);
      data.results.forEach(function(track){
        let trackArtist = track.artistName;
        let trackTitle = track.trackName;
        let trackArt = track.artworkUrl100;
        console.log(trackArt);
        $('div#results').append(`<div class='col-xs-3'><img src="${trackArt}" /><p>${trackArtist}</p><p><strong>${trackTitle}</strong></p></div>`);
      });
    });
  });
  console.log('Testing Music Call');
});
