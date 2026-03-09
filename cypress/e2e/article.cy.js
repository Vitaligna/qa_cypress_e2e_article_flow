/// <reference types="cypress" />

describe('Article flow', () => {
  const email = `user${Date.now()}@test.com`;
  const password = 'Password123!';
  const username = `user${Date.now()}`;

  const articleTitle = `Article ${Date.now()}`;
  const articleDescription = 'Test article description';
  const articleBody = 'This is a test article body';

  before(() => {
    cy.login({
      email,
      password,
      username,
    });
  });

  it('should create an article', () => {
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]').type(articleTitle);
    cy.get('[placeholder="What\'s this article about?"]').type(
      articleDescription,
    );
    cy.get('[placeholder="Write your article (in markdown)"]').type(
      articleBody,
    );

    cy.contains('button', 'Publish Article').click();

    cy.contains(articleTitle).should('be.visible');
    cy.contains(articleBody).should('be.visible');
  });

  describe('Delete article', () => {
    beforeEach(() => {
      cy.createArticle({
        title: articleTitle,
        description: articleDescription,
        body: articleBody,
      });
    });

    it('should delete the article', () => {
      cy.contains(articleTitle).click();

      cy.contains('button', 'Delete Article').click();

      cy.contains('Global Feed').click();

      cy.contains(articleTitle).should('not.exist');
    });
  });
});
