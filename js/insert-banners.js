var currentDate = new Date();
var bannerContainer = document.getElementById('bannerContainer');

var startDate_PrideMonth = new Date(currentDate.getFullYear(), 5, 1);
var endDate_PrideMonth = new Date(currentDate.getFullYear(), 5, 30);
var startDate_GameAnn = new Date(currentDate.getFullYear(), 1, 1);
var endDate_GameAnn = new Date(currentDate.getFullYear(), 1, 16);

if (
	currentDate >= startDate_PrideMonth && currentDate <= endDate_PrideMonth
) {
	var bannerPrideHTML = '<!-- Notice start -->\n' +
                   '<div class="notice notice-pride">\n' +
                   '    <p class="notice-text monospace semibold italic accent">Happy Pride Month!</p>\n' +
                   '</div>\n' +
                   '<!-- Notice end -->\n';
  bannerContainer.innerHTML = bannerPrideHTML;
} else if (
	currentDate >= startDate_GameAnn && currentDate <= endDate_GameAnn
) {
  var bannerGameAnnHTML = '<!-- Notice start -->\n' +
                              '<div class="notice notice-announcement project-jailbird-logo">\n' +
                              '    <p class="notice-text monospace semibold lightgray project-jailbird project-jailbird-logo">Game announcement! Tune in on February 16, UTC+2 @18:00 on the Vanta Interactive YouTube channel!</p>\n' +
                              '<div>\n' +
                              '<!-- Notice end -->\n';
  bannerContainer.innerHTML = bannerGameAnnHTML;
}
