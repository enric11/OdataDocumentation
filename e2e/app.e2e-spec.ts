import { ODataAPIRestDocumentationPage } from './app.po';

describe('o-data-apirest-documentation App', () => {
  let page: ODataAPIRestDocumentationPage;

  beforeEach(() => {
    page = new ODataAPIRestDocumentationPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
