// cue-chapters-plugin.js
(function(window, videojs) {
  'use strict';

  videojs.registerPlugin('cueChapters', function () {
    const player = this;

    player.ready(function () {
      const cuePoints = player.mediainfo && player.mediainfo.cue_points;

      if (!cuePoints || cuePoints.length === 0) {
        console.warn('No cue points found.');
        return;
      }

      // Filter cue points by type 'CODE' (adjust if needed)
      const chapters = cuePoints.filter(cue => cue.type === 'CODE');

      // Create container for chapter buttons
      const chapterContainer = document.createElement('div');
      chapterContainer.id = 'chapter-buttons';
      chapterContainer.style.marginTop = '20px';

      // Style container
      chapterContainer.style.display = 'flex';
      chapterContainer.style.flexWrap = 'wrap';
      chapterContainer.style.gap = '8px';

      chapters.forEach(cue => {
        const btn = document.createElement('button');
        btn.innerText = cue.name || `Chapter at ${cue.time}s`;
        btn.style.padding = '8px 12px';
        btn.style.backgroundColor = '#0077cc';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '14px';

        btn.onclick = () => {
          player.currentTime(cue.time);
          player.play();
        };

        chapterContainer.appendChild(btn);
      });

      // Append container just below the player element
      player.el().parentNode.appendChild(chapterContainer);
    });
  });

})(window, window.videojs);
