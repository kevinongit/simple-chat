import { Angular2ServerPage } from './app.po';

describe('angular2-server App', function() {
  let page: Angular2ServerPage;

  beforeEach(() => {
    page = new Angular2ServerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
