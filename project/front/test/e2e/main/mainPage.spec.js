describe('TestMainPage', function(){

var card = element.all(by.css('.elegant-card')).first();
var EC = protractor.ExpectedConditions;
var href = element.all(by.id('mpagedet')).get(2);
var isClickable = EC.elementToBeClickable(href, thumb_galery);

var thumb_galery = element.all(by.tagName('li')).get(1);

beforeEach(function(){
browser.get('http://127.0.0.2:8000/');

}, 10000);

it('should get title', function(){
   expect(browser.getTitle()).toEqual('Hostel.te.ua');

});

it('should get room card', function(){
expect(card).toBeTruthy();
});

it('should get img tag and click hyperlink to open modal', function(){
expect(card).toBeTruthy();
expect(card.element(by.css('img'))).toBeTruthy();
browser.wait(isClickable, 5000);
href.click();

expect(element(by.css('modal-dialog'))).toBeTruthy();

});

it('should open modal and get modals title, image main, and thumbinals', function(){
browser.wait(isClickable, 5000);
href.click();
expect(browser.getCurrentUrl()).toEqual('http://127.0.0.2:8000/detail/4');
});

it('should change picture in the detail room modal', function(){
browser.wait(isClickable, 5000);
href.click();
browser.wait(isClickable, 5000);
expect(element.all(by.tagName('img')).first().getAttribute('alt')).toEqual('slide0');
browser.wait(isClickable, 5000);
thumb_galery.click();
browser.wait(isClickable, 10000);
expect(element.all(by.id('imgitem')).get(1).element(by.tagName('img')).getAttribute('alt')).toEqual('slide1');
browser.wait(isClickable, 10000);

});


});