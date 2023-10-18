// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("register", ({ username, name, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
    username,
    name,
    password,
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", ({ title, url, likes = 0 }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: { title, url, likes },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedBlogappUser")).token
      }`,
    },
  });

  cy.visit("");
});

Cypress.Commands.add("likeBlog", (blog) => {
  // console.log("RECEIVE BLOG", blog);
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs/${blog.id}`,
    method: "PUT",
    body: { ...blog },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedBlogappUser")).token
      }`,
    },
  });

  cy.visit("");
});

Cypress.Commands.add("deleteBlog", (id) => {
  // console.log("RECEIVE BLOG", blog);
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedBlogappUser")).token
      }`,
    },
  });

  cy.visit("");
});
